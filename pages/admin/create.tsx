import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Category } from "../../types/category";
import Image from "next/image";

export default function CreatePost() {
    const { data: session } = useSession();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/posts/categories");
            const data: Category[] = await res.json();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    if (!session) return <p>ログインが必要です</p>;
    if (!session.user.isAdmin) return <p>管理者のみアクセス可能</p>;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            const newUrl = URL.createObjectURL(file);
            setImageFile(file);
            setPreviewUrl(newUrl);
            setButtonVisible(false);
        }
    };

    const handleSelectImageClick = () => {
        const input = document.getElementById("hidden-file-input") as HTMLInputElement;
        input?.click();
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("categoryId", categoryId);
        if (imageFile) formData.append("image", imageFile);

        await fetch("/api/posts", {
            method: "POST",
            body: formData,
        });

        router.push("/");
    };

    return (
        <div>
            <h1>記事作成</h1>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })}>ログアウト</button>

            <form onSubmit={submit} encType="multipart/form-data">
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="タイトル"
                    required
                />
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="内容"
                    required
                />
                <select
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    required
                >
                    <option value="">カテゴリを選択</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {/* プレビュー表示 */}
                {previewUrl && (
                    <div style={{ marginTop: "1em" }}>
                        <Image
                            src={previewUrl}
                            alt="選択した画像"
                            style={{ maxWidth: "300px", height: "auto" }}
                            unoptimized
                        />
                    </div>
                )}

                {/* 非表示の input */}
                <input
                    id="hidden-file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />

                {/* ボタン：画像未選択時のみ表示 */}
                {buttonVisible && (
                    <button type="button" onClick={handleSelectImageClick}>
                        画像を選択する
                    </button>
                )}

                <button type="submit">投稿</button>
            </form>
        </div>
    );
}
