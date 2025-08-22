import { Category } from "../types/post";

export const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch("/api/posts/categories");
    return await res.json();
};
