import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../../prisma/generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const categories = await prisma.category.findMany();
        return res.json(categories);
    }

    res.status(405).end();
}
