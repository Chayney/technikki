import { Logout } from '../../atoms/Link/logout';
import { Logo } from '../../atoms/Logo/index';
import { useSession } from "next-auth/react";
import styles from './style.module.css';
import { Menu } from '../../../components/molecules/menu';

export const Header = () => {
    const { data: session } = useSession();
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo
                    label={
                        <>
                            <span className={styles.mainTitle}>テク日記</span>
                            <br />
                            <span className={styles.subTitle}>～かけだしエンジニアの技術日記～</span>
                        </>
                    }
                />
            </div>
            <div className={styles.nav}>
                <Menu />
                {session && (
                    <Logout label="ログアウト" />
                )}
            </div>
        </header>
    );
}