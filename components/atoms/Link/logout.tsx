import React from 'react';
import { signOut } from "next-auth/react";

type LogoutProps = {
    label: string
};

export const Logout: React.FC<LogoutProps> = ({ label }) => (
    <button onClick={() => signOut({ callbackUrl: "/" })}>
        {label}
    </button>
);