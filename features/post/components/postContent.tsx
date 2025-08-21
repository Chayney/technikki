import Image from 'next/image';
import styles from '../styles/post.module.css';
import { useFormattedDate } from '../hooks/useFormattedDate';
import { Props } from '../types/post'

export const PostContent: React.FC<Props> = ({ post }) => {
    const formattedDate = useFormattedDate(post.createdAt);

    return (
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
        </div>
    );
};
