import React from 'react';
import Link from 'next/link';

type LogoProps = {
    label: string
};

export const Logo: React.FC<LogoProps> = ({ label }) => (
    <Link href="/">
        <span>{label}</span>
    </Link>
);