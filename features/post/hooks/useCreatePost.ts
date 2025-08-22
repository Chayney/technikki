import { useState, useEffect } from "react";
import { Category, CreatePostForm, ContentBlock } from "../types/post";
import { fetchCategories } from "../api/fetchCategories";
import { submitPost } from "../api/submitPost";
import { useRouter } from "next/router";

export const useCreatePost = () => {
    const router = useRouter();

    const [form, setForm] = useState<CreatePostForm>({
        title: "",
        content: [],
        categoryId: "",
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleImageChange = (file: File) => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        const newUrl = URL.createObjectURL(file);
        setForm(prev => ({ ...prev, image: file }));
        setPreviewUrl(newUrl);
        setButtonVisible(false);
    };

    const handleChange = <K extends keyof CreatePostForm>(
        key: K,
        value: CreatePostForm[K]
    ) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitPost(form);
        router.push("/");
    };

    return {
        form,
        previewUrl,
        categories,
        buttonVisible,
        handleImageChange,
        handleChange,
        handleSubmit,
        setButtonVisible,
    };
};
