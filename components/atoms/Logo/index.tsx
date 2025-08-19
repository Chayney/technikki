import React from 'react';
import Link from 'next/link';

type LogoProps = {
    label: React.ReactNode
};

export const Logo: React.FC<LogoProps> = ({ label }) => (
    <Link href="/">
        <span style={{ lineHeight: 1.2 }}>{label}</span>
    </Link>
);