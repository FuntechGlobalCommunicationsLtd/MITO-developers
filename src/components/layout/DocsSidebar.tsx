"use client";

import { useState, useEffect } from "react";
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
    ChevronDown,
} from "lucide-react";
import type { NavGroup, NavItem } from "@/lib/docs-nav";

const docsConfig: NavGroup[] = [
    {
        title: "Getting Started",
        items: [
            {
                title: "Introduction",
                href: "/developers",
                icon: <Book className="w-4 h-4" />,
                items: [
                    { title: "Three Transfer Phases", href: "/developers#transfer-phases" },
                    { title: "Integration Models", href: "/developers#choose-model" },
                    { title: "Ready to test?", href: "/developers#ready-to-test" },
                ],
            },
            {
                title: "Getting Started",
                href: "/developers/get-started",
                icon: <Milestone className="w-4 h-4" />,
                items: [
                    { title: "Integration Journey", href: "/developers/get-started#journey" },
                    { title: "Environments & Keys", href: "/developers/get-started#environments" },
                    { title: "Authentication", href: "/developers/get-started#authentication" },
                    { title: "Errors", href: "/developers/get-started#errors" },
                    { title: "Your First Request", href: "/developers/get-started#first-request" },
                ],
            },
            { title: "Pre-Live Testing", href: "/developers/pre-live-testing", icon: <Landmark className="w-4 h-4" /> },
        ],
    },
    {
        title: "Documentation",
        items: [
            {
                title: "Overview",
                href: "/developers/guides",
                icon: <Code2 className="w-4 h-4" />,
                items: [
                    { title: "Integration Models", href: "/developers/guides#models" },
                    { title: "Integration Methods", href: "/developers/guides#methods" },
                    { title: "Platform", href: "/developers/guides#platform" },
                ],
            },
            {
                title: "Retail affiliate",
                href: "/developers/guides/retail",
                icon: <Globe className="w-4 h-4" />,
                items: [
                    { title: "Integration methods", href: "/developers/guides/retail#integration-methods" },
                    { title: "Prerequisites", href: "/developers/guides/retail#prerequisites" },
                    { title: "Architecture", href: "/developers/guides/retail#architecture" },
                    { title: "Integration flow", href: "/developers/guides/retail#integration-flow" },
                    { title: "Webhooks", href: "/developers/guides/retail#webhooks" },
                    { title: "Status lifecycle", href: "/developers/guides/retail#status-lifecycle" },
                    { title: "APIs involved", href: "/developers/guides/retail#apis-involved" },
                ],
            },
            {
                title: "Biller",
                href: "/developers/guides/biller",
                icon: <Store className="w-4 h-4" />,
                items: [
                    {
                        title: "Wholesale biller",
                        href: "/developers/guides/wholesale",
                        items: [
                            { title: "Integration methods", href: "/developers/guides/wholesale#integration-methods" },
                            { title: "Prerequisites", href: "/developers/guides/wholesale#prerequisites" },
                            { title: "Architecture", href: "/developers/guides/wholesale#architecture" },
                            { title: "Integration flow", href: "/developers/guides/wholesale#integration-flow" },
                            { title: "Webhooks", href: "/developers/guides/wholesale#webhooks" },
                            { title: "Status lifecycle", href: "/developers/guides/wholesale#status-lifecycle" },
                            { title: "APIs involved", href: "/developers/guides/wholesale#apis-involved" },
                        ],
                    },
                    {
                        title: "Merchant biller",
                        href: "/developers/guides/merchant",
                        items: [
                            { title: "Integration methods", href: "/developers/guides/merchant#integration-methods" },
                            { title: "Prerequisites", href: "/developers/guides/merchant#prerequisites" },
                            { title: "Architecture", href: "/developers/guides/merchant#architecture" },
                            { title: "Integration flow", href: "/developers/guides/merchant#integration-flow" },
                            { title: "Webhooks", href: "/developers/guides/merchant#webhooks" },
                            { title: "Status lifecycle", href: "/developers/guides/merchant#status-lifecycle" },
                            { title: "APIs involved", href: "/developers/guides/merchant#apis-involved" },
                        ],
                    },
                ],
            },
            {
                title: "MTO partner",
                href: "/developers/guides/mto",
                icon: <Landmark className="w-4 h-4" />,
                items: [
                    { title: "FTP batch", href: "/developers/file-integration/mto-ftp" },
                    {
                        title: "File integration",
                        href: "/developers/file-integration",
                        items: [
                            { title: "When to use", href: "/developers/file-integration#when-to-use" },
                            { title: "Folder structure", href: "/developers/file-integration#folder-structure" },
                            { title: "Documentation", href: "/developers/file-integration#documentation" },
                            { title: "Related", href: "/developers/file-integration#related" },
                        ]
                    },
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
            {
                title: "Webhooks",
                href: "/developers/webhooks",
                icon: <Network className="w-4 h-4" />,
                items: [
                    { title: "Core behaviour", href: "/developers/webhooks#core-behaviour" },
                    { title: "Signature verification", href: "/developers/webhooks#signature-verification" },
                    { title: "Events by phase", href: "/developers/webhooks#events-by-phase" },
                ],
            },
            {
                title: "Settlement & Wallets",
                href: "/developers/settlement",
                icon: <Building2 className="w-4 h-4" />,
                items: [
                    { title: "Wallet model", href: "/developers/settlement#wallet-model" },
                    { title: "Settlement flow", href: "/developers/settlement#settlement-flow" },
                    { title: "Reconciliation", href: "/developers/settlement#reconciliation" },
                    { title: "Related flows", href: "/developers/settlement#related-flows" },
                ],
            },
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
            {
                title: "FTP file formats",
                href: "/developers/api-reference/ftp",
                icon: <FileText className="w-4 h-4" />,
                items: [
                    { title: "General file rules", href: "/developers/api-reference/ftp#rules" },
                ],
            },
            {
                title: "Retail API (full)",
                href: "/developers/api-reference/retail-api",
                icon: <Globe className="w-4 h-4" />,
                items: [
                    { title: "API Authentication", href: "/developers/api-reference/retail-api#auth" },
                    { title: "Mito Link SDKs", href: "/developers/api-reference/retail-api#sdks" },
                ],
            },
            {
                title: "Biller API (full)",
                href: "/developers/api-reference/biller-api",
                icon: <Store className="w-4 h-4" />,
                items: [
                    { title: "Biller Authentication", href: "/developers/api-reference/biller-api#auth" },
                ],
            },
            {
                title: "MTO API (full)",
                href: "/developers/api-reference/mto-api",
                icon: <Landmark className="w-4 h-4" />,
                items: [
                    { title: "Setup & Authorization", href: "/developers/api-reference/mto-api#setup" },
                ],
            },
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
    const [hash, setHash] = useState("");

    useEffect(() => {
        setHash(window.location.hash);
        const handleHashChange = () => setHash(window.location.hash);
        window.addEventListener("hashchange", handleHashChange, { passive: true });
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const isHashLink = item.href.includes("#");
    const active = isHashLink 
        ? pathname === item.href.split("#")[0] && hash === "#" + item.href.split("#")[1]
        : isNavItemActive(pathname, item.href);

    return (
        <Link
            href={item.href}
            className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-muted hover:text-primary",
                nested ? "text-xs py-1" : "text-sm",
                active 
                    ? nested 
                        ? "text-primary font-semibold bg-transparent" 
                        : "bg-primary/10 text-primary" 
                    : nested 
                        ? "text-muted-foreground/70" 
                        : "text-muted-foreground",
                item.disabled && "cursor-not-allowed opacity-60"
            )}
        >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {item.title}
        </Link>
    );
}

function NavGroupItem({ item, nestedLevel = 0, expandedItems, setExpandedItems }: {
    item: NavItem;
    nestedLevel?: number;
    expandedItems: Record<string, boolean>;
    setExpandedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
    const isExpanded = !!expandedItems[item.title];
    const hasItems = item.items && item.items.length > 0;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1 w-full">
                <div className="flex-1 min-w-0">
                    <NavLink item={item} nested={nestedLevel > 0} />
                </div>
                {hasItems && (
                    <button
                        onClick={() => {
                            setExpandedItems(prev => ({
                                ...prev,
                                [item.title]: !prev[item.title]
                            }));
                        }}
                        className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-colors shrink-0"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isExpanded ? "rotate-180" : "rotate-0")} />
                    </button>
                )}
            </div>
            {hasItems && isExpanded && (
                <div className={cn("flex flex-col gap-1 border-l pl-4 animate-in fade-in slide-in-from-top-1 duration-200", nestedLevel === 0 ? "ml-6" : "ml-4")}>
                    {item.items!.map((subItem, subIdx) => (
                        <NavGroupItem
                            key={subIdx}
                            item={subItem}
                            nestedLevel={nestedLevel + 1}
                            expandedItems={expandedItems}
                            setExpandedItems={setExpandedItems}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function DocsSidebar() {
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    return (
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block md:w-64 lg:w-72">
            <ScrollArea className="h-full py-6 pr-6 lg:py-8 border-r">
                <div className="flex flex-col gap-6 px-4">
                    {docsConfig.map((group, groupIdx) => (
                        <div key={groupIdx} className="flex flex-col gap-2">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground ml-2">
                                {group.title}
                            </h4>
                            <div className="flex flex-col gap-1">
                                {group.items.map((item, itemIdx) => (
                                    <NavGroupItem
                                        key={itemIdx}
                                        item={item}
                                        expandedItems={expandedItems}
                                        setExpandedItems={setExpandedItems}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    );
}
