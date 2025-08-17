import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "../../../prisma/generated/prisma";
import { CustomSession } from "../../../types/customNextAuth";
import type { File, Files, Fields } from "formidable";
import fs from "fs/promises";
import { put } from "@vercel/blob";

// CommonJS形式で読み込みたいためlintルールを無効化
// eslint-disable-next-line @typescript-eslint/no-require-imports
const formidable = require("formidable") as typeof import("formidable");

const prisma = new PrismaClient();

export const config = {
    api: {
        // formidableを使うのでbodyParser無効化
        bodyParser: false,
    },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
    const form = new formidable.IncomingForm({
        maxFileSize: 5 * 1024 * 1024, // 最大5MBの画像サイズ制限（任意）
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions) as CustomSession;
    if (req.method === "POST") {
        if (!session || !session.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const { fields, files } = await parseForm(req);

        const title = fields.title?.[0] || "";
        const content = fields.content?.[0] || "";
        const categoryId = parseInt(fields.categoryId?.[0] || "0", 10);

        let imageUrl: string | null = null;

        const imageFile = files.image?.[0] as File | undefined;

        if (imageFile) {
            const fileBuffer = await fs.readFile(imageFile.filepath);

            const blob = await put(imageFile.originalFilename || "image", fileBuffer, {
                access: "public",
                contentType: imageFile.mimetype || "application/octet-stream",
            });

            imageUrl = blob.url;
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                image: imageUrl,
                categoryId,
                authorId: Number(session.user.id),
            },
        });

        return res.status(201).json(post);
    }

    if (req.method === "GET") {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: { author: true },
        });
        return res.json(posts);
    }

    res.status(405).end();
}
