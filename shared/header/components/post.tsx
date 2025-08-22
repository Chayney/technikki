import Link from 'next/link';
import { PostProps } from '../types/header';
import styles from '../styles/post.module.css';

export const Post: React.FC<PostProps> = ({ label }) => (
    <Link href="/admin/create" className={styles.post}>
        {label}
    </Link>
);