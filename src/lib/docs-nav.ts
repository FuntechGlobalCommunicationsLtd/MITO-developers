import { ReactNode } from "react";

export interface NavItem {
    title: string;
    href: string;
    icon?: ReactNode;
    disabled?: boolean;
    items?: NavItem[];
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

/** Paths that are section roots — don't highlight parent when a sibling child is active */
export const NAV_SECTION_ROOTS = [
    "/developers",
    "/developers/guides",
    "/developers/api-reference",
];

export function isNavItemActive(pathname: string | null, href: string): boolean {
    if (!pathname) return false;
    if (pathname === href) return true;
    if (NAV_SECTION_ROOTS.includes(href)) return false;
    return pathname.startsWith(href + "/");
}
