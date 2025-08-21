export type HeaderProps = {
    isLoggedIn: boolean;
};

export type LogoProps = {
    label: React.ReactNode
};

export type MenuItem = {
    label: string;
    href: string;
};

export type MenuProps = {
    items: MenuItem[];
};

export type LogoutProps = {
    label: string
};
