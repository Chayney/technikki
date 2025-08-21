import { useSession, signOut } from "next-auth/react";
import { Header } from "../shared/header/components/header";

export default function Profile() {
    const { data: session } = useSession();
    return (
        <div>
            <Header />
            {session && (
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                    ログアウト
                </button>
            )}
        </div>
    )
}