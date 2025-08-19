import React from 'react';
import Link from 'next/link';

type HomeProps = {
    label: string
};

export const Home: React.FC<HomeProps> = ({ label }) => (
    <Link href="/">
        <span>{label}</span>
    </Link>
);