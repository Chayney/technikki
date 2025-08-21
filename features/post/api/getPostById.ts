import { PrismaClient } from "../../../prisma/generated/prisma";
import { SerializedPostWithAuthor } from "../types/post";

const prisma = new PrismaClient();

export const getPostById = async (id: number): Promise<SerializedPostWithAuthor | null> => {
    const post = await prisma.post.findUnique({
        where: { id },
        include: { author: true },
    });

    if (!post) return null;

    return {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    };
};
