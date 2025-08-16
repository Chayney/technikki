import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "../../../prisma/generated/prisma";
import { CustomSession } from "../../../types/customNextAuth";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions) as CustomSession;
    if (req.method === "POST") {
        if (!session || !session.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const { title, content } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                content,
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
