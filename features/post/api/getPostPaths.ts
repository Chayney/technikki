import { PrismaClient } from "../../../prisma/generated/prisma";

const prisma = new PrismaClient();

export const getPostPaths = async () => {
    const posts = await prisma.post.findMany({ select: { id: true } });

    return posts.map((post) => ({
        params: { id: post.id.toString() },
    }));
};
