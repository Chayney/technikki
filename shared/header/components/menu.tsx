import Link from 'next/link';
import styles from '../styles/menu.module.css';
import { MenuProps } from '../types/header';

export const Menu: React.FC<MenuProps> = ({ items }) => {
    return (
        <div className={styles.nav}>
            {items.map((item) => (
                <Link key={item.href} href={item.href}>
                    <span>{item.label}</span>
                </Link>
            ))}
        </div>
    );
};
