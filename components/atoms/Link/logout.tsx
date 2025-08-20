import React from 'react';
import { signOut } from "next-auth/react";
import styles from './logout.module.css';

type LogoutProps = {
    label: string
};

export const Logout: React.FC<LogoutProps> = ({ label }) => (
    <button className={styles.logout} onClick={() => signOut({ callbackUrl: "/" })}>
        {label}
    </button>
);