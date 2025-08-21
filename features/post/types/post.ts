import { Post, User } from '../../../prisma/generated/prisma';
import { ParsedUrlQuery } from "querystring";

export interface Params extends ParsedUrlQuery {
    id: string;
}

export type PostWithAuthor = Post & {
    author: User
}

export type SerializedPostWithAuthor = Omit<PostWithAuthor, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
};

export type Props = {
    post: SerializedPostWithAuthor;
};