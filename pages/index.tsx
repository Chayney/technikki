import { PostWithAuthor, SerializedPostWithAuthor } from "../types/post";
import { PrismaClient } from "../prisma/generated/prisma";
import { GetStaticProps } from "next";
import { useSession, signOut } from "next-auth/react";

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
    revalidate: 1
  };
}

export default function Home({ posts }: Props) {
  const { data: session } = useSession();
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
          <a href={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
}
