import { Menu } from './menu';
import { Logo } from './logo';
import { Logout } from './logout';
import { useHeader } from '../hooks/useHeader';
import styles from '../styles/header.module.css';
import { Post } from './post';

export const Header = () => {
    const { isLoggedIn } = useHeader();

    const menuItems = [
        { label: 'ホーム', href: '/' },
        { label: 'このブログについて', href: '/about' },
        { label: 'プロフィール', href: '/profile' },
    ];

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
                <Menu items={menuItems} />
                {isLoggedIn && (
                    <div>
                        <Post label="記事投稿" />
                        <Logout label="ログアウト" />
                    </div>
                )}
            </div>
        </header>
    );
};
