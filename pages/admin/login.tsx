import { getCsrfToken, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import styles from '../../styles/Form.module.css';

type SignInProps = { csrfToken: string | null };

export default function SignIn({ csrfToken }: SignInProps) {
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.email as HTMLInputElement).value;
        const password = (form.password as HTMLInputElement).value;

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/admin/create",
        });

        if (result?.error) {
            setError("ログインに失敗しました。");
        } else if (result?.ok) {
            window.location.href = result.url ?? "/admin/create";
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? undefined} className={styles.input} />
                <label className={styles.label}>Email</label>
                <input name="email" type="email" required className={styles.input} />
                <label className={styles.label}>Password</label>
                <input name="password" type="password" required className={styles.input} />
                <button className={styles.button} type="submit">ログイン</button>
            </form>
            {error && <p>{error}</p>}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    return { props: { csrfToken } };
};
