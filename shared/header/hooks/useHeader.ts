import { useSession } from "next-auth/react";

export const useHeader = () => {
    const { data: session } = useSession();
    const isLoggedIn = !!session;

    return {
        session,
        isLoggedIn
    };
}