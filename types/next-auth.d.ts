import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        // authorizedに返すプロパティかどうかの明示が必要
        id: string;

        // authorizedに返すプロパティを設定
        email: string;
        isAdmin: boolean;
    }

    // session.userのデフォルトはname,email,imageのため拡張
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            isAdmin: boolean;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        isAdmin: boolean;
    }
}
