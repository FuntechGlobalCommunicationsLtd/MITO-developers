"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/lib/docs-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Book,
    Code2,
    Network,
    Building2,
    FileText,
    LifeBuoy,
    Milestone,
    HelpCircle,
    FileDown,
    Key,
    Store,
    Landmark,
    Globe,
    Wallet,
    ArrowRightLeft,
    Banknote,
    Settings,
    FileCode2,
    TerminalSquare,
} from "lucide-react";
import type { NavGroup, NavItem } from "@/lib/docs-nav";

const docsConfig: NavGroup[] = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/developers", icon: <Book className="w-4 h-4" /> },
            { title: "Getting Started", href: "/developers/get-started", icon: <Milestone className="w-4 h-4" /> },
            { title: "API Credentials", href: "/developers/credentials", icon: <Key className="w-4 h-4" /> },
        ],
    },
    {
        title: "Documentation",
        items: [
            { title: "Overview", href: "/developers/guides", icon: <Code2 className="w-4 h-4" /> },
            {
                title: "Retail affiliate",
                href: "/developers/guides/retail",
                icon: <Globe className="w-4 h-4" />,
            },
            {
                title: "Biller",
                href: "/developers/guides/biller",
                icon: <Store className="w-4 h-4" />,
                items: [
                    { title: "Wholesale biller", href: "/developers/guides/wholesale" },
                    { title: "Merchant biller", href: "/developers/guides/merchant" },
                ],
            },
            {
                title: "MTO partner",
                href: "/developers/guides/mto",
                icon: <Landmark className="w-4 h-4" />,
                items: [
                    { title: "FTP batch", href: "/developers/file-integration/mto-ftp" },
                    { title: "File integration", href: "/developers/file-integration" },
                ],
            },
        ],
    },
    {
        title: "Integration methods",
        items: [
            { title: "Hosted checkout", href: "/developers/hosted-flows", icon: <TerminalSquare className="w-4 h-4" /> },
            { title: "SDK & widget", href: "/developers/guides/sdk", icon: <FileCode2 className="w-4 h-4" /> },
        ],
    },
    {
        title: "Platform",
        items: [
            { title: "Webhooks", href: "/developers/webhooks", icon: <Network className="w-4 h-4" /> },
            { title: "Settlement & Wallets", href: "/developers/settlement", icon: <Building2 className="w-4 h-4" /> },
        ],
    },
    {
        title: "API Reference",
        items: [
            { title: "Overview", href: "/developers/api-reference", icon: <FileText className="w-4 h-4" /> },
            { title: "Collect", href: "/developers/api-reference/collect", icon: <Wallet className="w-4 h-4" /> },
            { title: "Process / Forex", href: "/developers/api-reference/process-forex", icon: <ArrowRightLeft className="w-4 h-4" /> },
            { title: "Disburse", href: "/developers/api-reference/disburse", icon: <Banknote className="w-4 h-4" /> },
            { title: "Manage", href: "/developers/api-reference/manage", icon: <Settings className="w-4 h-4" /> },
            { title: "SDK", href: "/developers/api-reference/sdk", icon: <FileCode2 className="w-4 h-4" /> },
            { title: "Hosted checkout", href: "/developers/api-reference/hosted", icon: <TerminalSquare className="w-4 h-4" /> },
            { title: "FTP file formats", href: "/developers/api-reference/ftp", icon: <FileText className="w-4 h-4" /> },
            { title: "Retail API (full)", href: "/developers/api-reference/retail-api", icon: <Globe className="w-4 h-4" /> },
            { title: "Biller API (full)", href: "/developers/api-reference/biller-api", icon: <Store className="w-4 h-4" /> },
            { title: "MTO API (full)", href: "/developers/api-reference/mto-api", icon: <Landmark className="w-4 h-4" /> },
        ],
    },
    {
        title: "Resources & Support",
        items: [
            { title: "Tools & Downloads", href: "/developers/resources", icon: <FileDown className="w-4 h-4" /> },
            { title: "FAQ", href: "/developers/faq", icon: <HelpCircle className="w-4 h-4" /> },
            { title: "Support & Go-Live", href: "/developers/support", icon: <LifeBuoy className="w-4 h-4" /> },
            { title: "Changelog", href: "/developers/changelog" },
        ],
    },
];

function NavLink({ item, nested }: { item: NavItem; nested?: boolean }) {
    const pathname = usePathname();
    const active = isNavItemActive(pathname, item.href);

    return (
        <Link
            href={item.href}
            className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-muted hover:text-primary",
                nested ? "text-xs py-1" : "text-sm",
                active ? "bg-primary/10 text-primary" : nested ? "text-muted-foreground/70" : "text-muted-foreground",
                item.disabled && "cursor-not-allowed opacity-60"
            )}
        >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {item.title}
        </Link>
    );
}

export function DocsSidebar() {
    return (
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block md:w-64 lg:w-72">
            <ScrollArea className="h-full py-6 pr-6 lg:py-8 border-r">
                <div className="flex flex-col gap-6 px-4">
                    {docsConfig.map((group, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground ml-2">
                                {group.title}
                            </h4>
                            <div className="flex flex-col gap-1">
                                {group.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex flex-col gap-1">
                                        <NavLink item={item} />
                                        {item.items && (
                                            <div className="flex flex-col gap-1 ml-6 border-l pl-4">
                                                {item.items.map((subItem, subIndex) => (
                                                    <NavLink key={subIndex} item={subItem} nested />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    );
}
