import { useSession, signOut } from "next-auth/react";
import { Header } from "../components/organisms/Header";

export default function About() {
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