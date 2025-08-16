import { Post, User } from '../prisma/generated/prisma';

export type PostWithAuthor = Post & {
    author: User
}

export type SerializedPostWithAuthor = Omit<PostWithAuthor, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
};