import { CreatePostForm } from "../types/post";

export const submitPost = async (form: CreatePostForm) => {
    const formData = new FormData();
    formData.append("title", form.title);

    const contentString = form.content.map(block => block.content).join("\n");
    formData.append("content", contentString);

    formData.append("categoryId", form.categoryId);

    if (form.image) formData.append("image", form.image);

    await fetch("/api/posts", {
        method: "POST",
        body: formData,
    });
};
