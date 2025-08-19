import React from 'react';
import Link from 'next/link';

type ProfileProps = {
    label: string
};

export const Profile: React.FC<ProfileProps> = ({ label }) => (
    <Link href="/profile">
        <span>{label}</span>
    </Link>
);