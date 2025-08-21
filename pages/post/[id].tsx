import { GetStaticPaths, GetStaticProps } from 'next';
import { Header } from '../../shared/header/components/header';
import { PostContent } from '../../features/post/components/postContent';
import styles from '../../styles/Post.module.css';
import { getPostPaths } from '../../features/post/api/getPostPaths';
import { getPostById } from '../../features/post/api/getPostById';
import { Props, Params } from '../../features/post/types/post';

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = await getPostPaths();
    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    if (!params) return { notFound: true };

    const post = await getPostById(Number(params.id));
    if (!post) return { notFound: true };

    return {
        props: { post },
        revalidate: 60,
    };
};

export default function PostPage({ post }: Props) {
    return (
        <div>
            <Header />
            <div className={styles.parentContainer}>
                <PostContent post={post} />
            </div>
        </div>
    );
}
