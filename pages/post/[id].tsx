import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "../../prisma/generated/prisma";
import { ParsedUrlQuery } from "querystring";
import { SerializedPostWithAuthor } from "../../types/post";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const prisma = new PrismaClient();

interface Params extends ParsedUrlQuery {
    id: string;
}

type Props = {
    post: SerializedPostWithAuthor;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const posts = await prisma.post.findMany({
        select: { id: true },
    });

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    if (!params) {
        return { notFound: true };
    }

    const post = await prisma.post.findUnique({
        where: { id: Number(params.id) },
        include: { author: true },
    });

    if (!post) {
        return { notFound: true };
    }

    const serializedPost: SerializedPostWithAuthor = {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    };

    return {
        props: {
            post: serializedPost,
        },
        revalidate: 60,
    };
};

export default function Post({ post }: Props) {
    const { data: session } = useSession();
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        setFormattedDate(new Date(post.createdAt).toLocaleString());
    }, [post.createdAt]);

    return (
        <div>
            <h1>{post.title}</h1>
            {post.image && (
                <div>
                    <Image
                        src={post.image}
                        alt={`画像: ${post.title}`}
                        width={800}
                        height={600}
                        style={{ maxWidth: "600px", height: "auto", marginBottom: "1em" }}
                        unoptimized
                        priority
                    />
                </div>
            )}
            <div>{post.content}</div>
            <small>作成日: {formattedDate}</small>
            {session && (
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                    ログアウト
                </button>
            )}
        </div>
    );
}
