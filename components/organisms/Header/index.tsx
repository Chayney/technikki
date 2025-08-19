import { Logo } from '../../atoms/Logo/index';
import styles from './style.module.css';

export default function Header() {
    return (
        <header className={styles.logo}>
            <Logo label="テク日記" />
        </header>
    );
}