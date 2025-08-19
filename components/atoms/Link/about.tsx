import React from 'react';
import Link from 'next/link';

type AboutProps = {
    label: string
};

export const About: React.FC<AboutProps> = ({ label }) => (
    <Link href="/about">
        <span>{label}</span>
    </Link>
);