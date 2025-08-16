import type { Session } from "next-auth";

export type CustomSession = Session & {
    user: {
        id: string;
        email: string;
        isAdmin: boolean;
    };
};