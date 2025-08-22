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

export interface Category {
    id: string;
    name: string;
}

export interface CreatePostForm {
    title: string;
    content: ContentBlock[];
    categoryId: string;
    image?: File | null;
}

export type TitleProps = {
    value: string;
    onChange: (value: string) => void;
};

export type ContentProps = {
    value: string;
    onChange: (value: string) => void;
};

export type BlockType = "heading1" | "heading2" | "paragraph";

export type ContentBlock = {
    id: string;
    type: BlockType;
    content: string;
};

export type ContentEditorProps = {
    value: ContentBlock[];
    onChange: (blocks: ContentBlock[]) => void;
};

export type Categories = {
    id: number,
    name: string
}

export type CategoriesProps = {
    value: string;
    onChange: (value: string) => void;
    categories: Category[];
};

export type ImageProps = {
    previewUrl: string | null;
    onChange: (file: File) => void;
    buttonVisible: boolean;
    setButtonVisible: (visible: boolean) => void;
};
