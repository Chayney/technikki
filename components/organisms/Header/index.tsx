import { Logout } from '../../atoms/Link/logout';
import { Home } from '../../atoms/Link/home';
import { Profile } from '../../atoms/Link/profile';
import { About } from '../../atoms/Link/about';
import { Logo } from '../../atoms/Logo/index';
import { useSession } from "next-auth/react";
import styles from './style.module.css';

export default function Header() {
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
                <Home label="ホーム" />
                <About label="このブログについて" />
                <Profile label="プロフィール" />
                {session && (
                    <Logout label="ログアウト" />
                )}
            </div>
        </header>
    );
}