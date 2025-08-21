import { LogoutProps } from "../types/header";
import { useLogout } from "../hooks/useLogout";
import styles from '../styles/logout.module.css';

export const Logout: React.FC<LogoutProps> = ({ label }) => {
    const { handleLogout } = useLogout();

    return (
        <button className={styles.logout} onClick={handleLogout}>
            {label}
        </button>
    );
};
