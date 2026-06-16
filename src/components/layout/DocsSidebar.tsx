"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Book,
    Code2,
    TerminalSquare,
    Network,
    Building2,
    FileText,
    LifeBuoy,
    Milestone,
    HelpCircle,
    FileDown,
    Key
} from "lucide-react";

interface NavItem {
    title: string;
    href: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    items?: NavItem[];
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

const docsConfig: NavGroup[] = [
    {
        title: "Overview",
        items: [
            { title: "Introduction", href: "/developers", icon: <Book className="w-4 h-4" /> },
            { title: "Getting Started", href: "/developers/get-started", icon: <Milestone className="w-4 h-4" /> },
            { title: "API Credentials", href: "/developers/credentials", icon: <Key className="w-4 h-4" /> },
        ],
    },
    {
        title: "Integration Guides",
        items: [
            { title: "Guides Overview", href: "/developers/guides", icon: <Code2 className="w-4 h-4" /> },
            { title: "MTO Submission", href: "/developers/guides/mto" },
            { title: "Retail Submission", href: "/developers/guides/retail" },
            { 
                title: "Biller Submission", 
                href: "/developers/guides/biller",
                items: [
                    { title: "Wholesale Biller", href: "/developers/guides/wholesale" },
                    { title: "Merchant Biller", href: "/developers/guides/merchant" },
                ]
            },
            { title: "SDK Integration", href: "/developers/guides/sdk" },
        ],
    },
    {
        title: "Core Architecture",
        items: [
            { title: "Hosted Payment Flows", href: "/developers/hosted-flows", icon: <TerminalSquare className="w-4 h-4" /> },
            { title: "Webhooks & Callbacks", href: "/developers/webhooks", icon: <Network className="w-4 h-4" /> },
            { title: "Settlement & Wallets", href: "/developers/settlement", icon: <Building2 className="w-4 h-4" /> },
            { title: "File / FTP Integration", href: "/developers/file-integration", icon: <FileText className="w-4 h-4" /> },
            { title: "MTO FTP Interface", href: "/developers/file-integration/mto-ftp" },
        ],
    },
    {
        title: "API Reference",
        items: [
            { title: "API Landing", href: "/developers/api-reference" },
            { title: "MTO Gateway API", href: "/developers/api-reference/mto-api" },
            { title: "Retail Submission API", href: "/developers/api-reference/retail-api" },
            { title: "Biller Submission API", href: "/developers/api-reference/biller-api" },
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

export function DocsSidebar() {
    const pathname = usePathname();

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
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                                                pathname === item.href || (pathname?.startsWith(item.href + "/") && item.href !== "/developers" && item.href !== "/developers/guides" && item.href !== "/developers/api-reference")
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground",
                                                item.disabled && "cursor-not-allowed opacity-60"
                                            )}
                                        >
                                            {item.icon && <span className="shrink-0">{item.icon}</span>}
                                            {item.title}
                                        </Link>
                                        {item.items && (
                                            <div className="flex flex-col gap-1 ml-6 border-l pl-4">
                                                {item.items.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        href={subItem.href}
                                                        className={cn(
                                                            "flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-muted hover:text-primary",
                                                            pathname === subItem.href
                                                                ? "text-primary"
                                                                : "text-muted-foreground/70",
                                                            subItem.disabled && "cursor-not-allowed opacity-60"
                                                        )}
                                                    >
                                                        {subItem.title}
                                                    </Link>
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
