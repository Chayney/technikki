import { PostWithAuthor, SerializedPostWithAuthor } from "../types/post";
import { PrismaClient } from "../prisma/generated/prisma";
import { GetStaticProps } from "next";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  posts: SerializedPostWithAuthor[];
}

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts: PostWithAuthor[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  const serializedPosts: SerializedPostWithAuthor[] = posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return {
    props: { posts: serializedPosts },
    revalidate: 60
  };
}

export default function Home({ posts: initialPosts }: Props) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<SerializedPostWithAuthor[]>(initialPosts);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("投稿取得失敗", err));
  }, []);

  return (
    <div>
      <h1>ブログ</h1>
      {session && (
        <button onClick={() => signOut({ callbackUrl: "/" })}>
          ログアウト
        </button>
      )}
      {posts.map(post => (
        <div key={post.id}>
          {post.image && (
            <div>
              <Image
                src={post.image}
                alt={`画像: ${post.title}`}
                style={{ maxWidth: "300px", height: "auto", marginTop: "10px" }}
                unoptimized
              />
            </div>
          )}
          <a href={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
}
