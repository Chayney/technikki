import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "../../prisma/generated/prisma";
import { ParsedUrlQuery } from "querystring";
import { SerializedPostWithAuthor } from "../../types/post";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Header } from "../../components/organisms/Header";
import styles from '../../styles/Post.module.css';

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
        setFormattedDate(new Date(post.createdAt).toLocaleDateString());
    }, [post.createdAt]);

    return (
        <div>
            <Header />
            <div className={styles.parentContainer}>
                <div className={styles.childContainer}>
                    {post.image && (
                        <div className={styles.imageContainer}>
                            <Image
                                src={post.image}
                                alt={`画像: ${post.title}`}
                                fill
                                className={styles.contentImage}
                                unoptimized
                                priority
                            />
                        </div>
                    )}
                    <div className={styles.textContainer}>
                        <h1>{post.title}</h1>
                        <small>作成日: {formattedDate}</small>
                        <div>{post.content}</div>
                    </div>
                    {session && (
                        <button onClick={() => signOut({ callbackUrl: "/" })}>
                            ログアウト
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
