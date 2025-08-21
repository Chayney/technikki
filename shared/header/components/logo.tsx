import Link from 'next/link';
import { LogoProps } from '../types/header';
import styles from '../styles/logo.module.css';

export const Logo: React.FC<LogoProps> = ({ label }) => (
    <Link href="/">
        <span className={styles.logo}>{label}</span>
    </Link>
);