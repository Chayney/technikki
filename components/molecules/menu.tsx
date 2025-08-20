import { Home } from "../atoms/Link/home";
import { About } from "../atoms/Link/about";
import { Profile } from "../atoms/Link/profile";
import styles from './style.module.css';

export const Menu = () => {
    return (
        <div className={styles.nav}>
            <Home label="ホーム" />
            <About label="このブログについて" />
            <Profile label="プロフィール" />
        </div>
    )
}