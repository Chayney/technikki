import { signOut } from "next-auth/react";

export const useLogout = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
    };

    return { handleLogout };
};
