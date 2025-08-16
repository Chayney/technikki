import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreatePost() {
    const { data: session } = useSession();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    if (!session) return <p>ログインが必要です</p>;
    if (!session.user.isAdmin) return <p>管理者のみアクセス可能</p>;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        router.push("/").then(() => window.location.reload());
    };

    return (
        <div>
            <h1>記事作成</h1>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })}>ログアウト</button>

            <form onSubmit={submit}>
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
                <button type="submit">投稿</button>
            </form>
        </div>
    );
}
