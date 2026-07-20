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
        title: "Integration methods",
        items: [
            {
                title: "Overview",
                href: "/developers/guides",
                icon: <Code2 className="w-4 h-4" />,
                items: [
                    { title: "API endpoints", href: "/developers/guides#api-endpoints" },
                    { title: "Integration methods", href: "/developers/guides#methods" },
                    { title: "Helper methods", href: "/developers/guides#helpers" },
                ],
            },
            {
                title: "Biller",
                href: "/developers/guides/biller",
                icon: <Store className="w-4 h-4" />,
                items: [
                    {
                        title: "Overview",
                        href: "/developers/guides/biller#overview",
                        items: [
                            { title: "Introduction", href: "/developers/guides/biller#introduction" },
                            { title: "Overall workflow", href: "/developers/guides/biller#overall-workflow" },
                            { title: "Integration options", href: "/developers/guides/biller#integration-options" },
                            { title: "API contract", href: "/developers/guides/biller#api-contract" },
                            { title: "Authentication (Basic Auth)", href: "/developers/guides/biller#authentication" },
                            { title: "Callback notifications", href: "/developers/guides/biller#webhooks" },
                        ],
                    },
                    { title: "Hosted checkout", href: "/developers/guides/biller#biller-hosted" },
                    { title: "Full API", href: "/developers/guides/biller#biller-api" },
                    { title: "Wholesale / Merchant", href: "/developers/guides/biller#biller-wholesale" },
                    {
                        title: "APIs involved",
                        href: "/developers/guides/biller#apis-involved",
                        items: [
                            { title: "Workflow APIs", href: "/developers/guides/biller#apis-workflow" },
                            { title: "Helper APIs", href: "/developers/guides/biller#apis-helper" },
                        ],
                    },
                    { title: "Wholesale guide", href: "/developers/guides/wholesale" },
                    { title: "Merchant guide", href: "/developers/guides/merchant" },
                ],
            },
            {
                title: "Retail",
                href: "/developers/guides/retail",
                icon: <Globe className="w-4 h-4" />,
                items: [
                    {
                        title: "Overview",
                        href: "/developers/guides/retail#overview",
                        items: [
                            { title: "Introduction", href: "/developers/guides/retail#introduction" },
                            { title: "Overall workflow", href: "/developers/guides/retail#overall-workflow" },
                            { title: "Integration options", href: "/developers/guides/retail#integration-options" },
                            { title: "API contract", href: "/developers/guides/retail#api-contract" },
                            { title: "Authentication (JWT)", href: "/developers/guides/retail#authentication" },
                            { title: "Webhooks", href: "/developers/guides/retail#webhooks" },
                        ],
                    },
                    {
                        title: "Hosted",
                        href: "/developers/guides/retail#retail-hosted-pages",
                        items: [
                            { title: "Hosted pages", href: "/developers/guides/retail#retail-hosted-pages" },
                            { title: "Hosted checkout (hybrid)", href: "/developers/guides/retail#retail-hosted-hybrid" },
                            { title: "Hosted API reference", href: "/developers/api-reference/hosted" },
                        ],
                    },
                    {
                        title: "SDK",
                        href: "/developers/guides/retail#retail-widget",
                        items: [
                            { title: "Widget (SDK)", href: "/developers/guides/retail#retail-widget" },
                            { title: "SDK guide", href: "/developers/guides/sdk" },
                            { title: "SDK API reference", href: "/developers/api-reference/sdk" },
                        ],
                    },
                    {
                        title: "API",
                        href: "/developers/guides/retail#retail-full-api",
                        items: [
                            { title: "Full API integration", href: "/developers/guides/retail#retail-full-api" },
                            { title: "APIs involved", href: "/developers/guides/retail#apis-involved" },
                            { title: "Retail API reference", href: "/developers/api-reference/retail-api" },
                        ],
                    },
                ],
            },
            {
                title: "MTO",
                href: "/developers/guides/mto",
                icon: <Landmark className="w-4 h-4" />,
                items: [
                    {
                        title: "Overview",
                        href: "/developers/guides/mto#overview",
                        items: [
                            { title: "Introduction", href: "/developers/guides/mto#introduction" },
                            { title: "Overall workflow", href: "/developers/guides/mto#overall-workflow" },
                            { title: "Integration options", href: "/developers/guides/mto#integration-options" },
                            { title: "API contract", href: "/developers/guides/mto#api-contract" },
                            { title: "Authentication", href: "/developers/guides/mto#authentication" },
                        ],
                    },
                    { title: "REST API", href: "/developers/guides/mto#mto-api" },
                    { title: "FTP Gateway", href: "/developers/guides/mto#mto-ftp" },
                    { title: "APIs involved", href: "/developers/guides/mto#apis-involved" },
                    { title: "MTO API reference", href: "/developers/api-reference/mto-api" },
                    { title: "FTP file formats", href: "/developers/api-reference/ftp" },
                ],
            },
            {
                title: "Webhooks",
                href: "/developers/webhooks",
                icon: <Network className="w-4 h-4" />,
                items: [
                    {
                        title: "Overview",
                        href: "/developers/webhooks#overview",
                        items: [
                            { title: "Introduction", href: "/developers/webhooks#introduction" },
                            { title: "Overall workflow", href: "/developers/webhooks#overall-workflow" },
                            { title: "Notification channels", href: "/developers/webhooks#integration-options" },
                            { title: "Delivery contract", href: "/developers/webhooks#api-contract" },
                        ],
                    },
                    {
                        title: "Outbound eventTypes",
                        href: "/developers/webhooks#outbound-webhooks",
                        items: [
                            { title: "Payment", href: "/developers/webhooks#outbound-payment" },
                            { title: "Transaction", href: "/developers/webhooks#outbound-transaction" },
                            { title: "Refund & chargeback", href: "/developers/webhooks#outbound-refund-chargeback" },
                            { title: "Payout (MTO)", href: "/developers/webhooks#outbound-payout-mto" },
                        ],
                    },
                    {
                        title: "Callback NotificationTypes",
                        href: "/developers/webhooks#callback-notifications",
                        items: [
                            { title: "Transaction lifecycle", href: "/developers/webhooks#callback-transaction-lifecycle" },
                            { title: "Refunds & payouts", href: "/developers/webhooks#callback-refunds-payouts" },
                            { title: "Onboarding & verification", href: "/developers/webhooks#callback-onboarding-verification" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Helper methods",
        items: [
            {
                title: "Rates",
                href: "/developers/rates",
                icon: <ArrowRightLeft className="w-4 h-4" />,
                items: [
                    { title: "Retail quote", href: "/developers/rates#rates-retail" },
                    { title: "MTO rates", href: "/developers/rates#rates-mto" },
                    { title: "APIs involved", href: "/developers/rates#apis-involved" },
                ],
            },
            {
                title: "Wallets",
                href: "/developers/wallets",
                icon: <Wallet className="w-4 h-4" />,
                items: [
                    { title: "MTO Collection", href: "/developers/wallets#wallets-collection" },
                    { title: "Biller", href: "/developers/wallets#wallets-biller" },
                    { title: "Retail", href: "/developers/wallets#wallets-retail" },
                    { title: "APIs involved", href: "/developers/wallets#apis-involved" },
                ],
            },
            {
                title: "KYC",
                href: "/developers/kyc",
                icon: <Milestone className="w-4 h-4" />,
                items: [
                    { title: "SDK / Hosted", href: "/developers/kyc#kyc-sdk" },
                    { title: "Full API", href: "/developers/kyc#kyc-api" },
                    { title: "APIs involved", href: "/developers/kyc#apis-involved" },
                ],
            },
            {
                title: "Settlement",
                href: "/developers/settlement",
                icon: <Building2 className="w-4 h-4" />,
                items: [
                    { title: "Biller settlement", href: "/developers/settlement#settlement-biller" },
                    { title: "MTO / Collection", href: "/developers/settlement#settlement-mto" },
                ],
            },
            {
                title: "Payouts",
                href: "/developers/payouts",
                icon: <Banknote className="w-4 h-4" />,
                items: [
                    { title: "Collection Api List", href: "/developers/payouts#payouts-collection" },
                    { title: "Corporate withdrawal", href: "/developers/payouts#payouts-withdrawal" },
                    { title: "APIs involved", href: "/developers/payouts#apis-involved" },
                ],
            },
        ],
    },
    {
        title: "API Reference",
        items: [
            { title: "Overview", href: "/developers/api-reference", icon: <FileText className="w-4 h-4" /> },
            { title: "SDK", href: "/developers/api-reference/sdk", icon: <FileCode2 className="w-4 h-4" /> },
            { title: "Hosted checkout", href: "/developers/api-reference/hosted", icon: <TerminalSquare className="w-4 h-4" /> },
            {
                title: "Manage",
                href: "/developers/api-reference/manage",
                icon: <Settings className="w-4 h-4" />,
                items: [
                    { title: "Webhook verification", href: "/developers/api-reference/manage#webhook-verification" },
                ],
            },
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
                    { title: "Error handling", href: "/developers/api-reference/retail-api#errors" },
                    { title: "Idempotency", href: "/developers/api-reference/retail-api#idempotency" },
                    { title: "Partner-visible statuses", href: "/developers/api-reference/retail-api#status-model" },
                    { title: "Generate Access Token", href: "/developers/api-reference/retail-api#auth-login" },
                    { title: "Create User (Onboard)", href: "/developers/api-reference/retail-api#create-user" },
                    { title: "Get User Profile", href: "/developers/api-reference/retail-api#get-user" },
                    { title: "Get Wallet Balances", href: "/developers/api-reference/retail-api#get-balances" },
                    { title: "List Users", href: "/developers/api-reference/retail-api#get-users" },
                    { title: "List Corridors", href: "/developers/api-reference/retail-api#get-corridors" },
                    { title: "Get Payout Providers", href: "/developers/api-reference/retail-api#get-lookup-provider" },
                    { title: "Get Lookup Types", href: "/developers/api-reference/retail-api#get-lookup-types" },
                    { title: "Get Exchange Rates", href: "/developers/api-reference/retail-api#post-rates" },
                    { title: "Get Beneficiary Requirements", href: "/developers/api-reference/retail-api#get-beneficiary-requirements" },
                    { title: "Get Beneficiary Details", href: "/developers/api-reference/retail-api#get-beneficiary" },
                    { title: "Create Beneficiary", href: "/developers/api-reference/retail-api#create-beneficiary" },
                    { title: "List Beneficiaries", href: "/developers/api-reference/retail-api#get-beneficiaries" },
                    { title: "Create Transaction", href: "/developers/api-reference/retail-api#create-transaction" },
                    { title: "Get Transaction (by-reference)", href: "/developers/api-reference/retail-api#get-transaction" },
                    { title: "List Transactions", href: "/developers/api-reference/retail-api#get-transactions-list" },
                    { title: "Webhook Event Notification", href: "/developers/api-reference/retail-api#webhook-notification" },
                    { title: "Mito Link SDKs", href: "/developers/api-reference/retail-api#sdks" },
                ],
            },
            {
                title: "Biller API (full)",
                href: "/developers/api-reference/biller-api",
                icon: <Store className="w-4 h-4" />,
                items: [
                    { title: "Biller Authentication", href: "/developers/api-reference/biller-api#auth" },
                    { title: "Initiate Transaction", href: "/developers/api-reference/biller-api#initiate-transaction" },
                    { title: "Get Transaction Status", href: "/developers/api-reference/biller-api#get-status" },
                    { title: "List Transactions", href: "/developers/api-reference/biller-api#get-transactions" },
                    { title: "Payment Confirmation", href: "/developers/api-reference/biller-api#payment-confirmation" },
                    { title: "Switch Payment Mode", href: "/developers/api-reference/biller-api#switch-payment-mode" },
                    { title: "Get Wallet Balances", href: "/developers/api-reference/biller-api#get-balances" },
                    { title: "Create Payout", href: "/developers/api-reference/biller-api#create-payout" },
                    { title: "Add Payout Account", href: "/developers/api-reference/biller-api#add-payout-account" },
                    { title: "Get Payout Accounts", href: "/developers/api-reference/biller-api#get-payout-accounts" },
                    { title: "Get Payout Report", href: "/developers/api-reference/biller-api#get-payout-report" },
                    { title: "Create Refund", href: "/developers/api-reference/biller-api#create-refund" },
                    { title: "Get Refund Details", href: "/developers/api-reference/biller-api#get-refund" },
                    { title: "List Refunds", href: "/developers/api-reference/biller-api#get-refund-list" },
                ],
            },
            {
                title: "MTO API (full)",
                href: "/developers/api-reference/mto-api",
                icon: <Landmark className="w-4 h-4" />,
                items: [
                    { title: "Setup & Authorization", href: "/developers/api-reference/mto-api#setup" },
                    { title: "Generate auth token", href: "/developers/api-reference/mto-api#auth-login" },
                    { title: "Get available corridors", href: "/developers/api-reference/mto-api#exchange-corridors" },
                    { title: "Get exchange rate", href: "/developers/api-reference/mto-api#exchange-rates" },
                    { title: "Get provider by country", href: "/developers/api-reference/mto-api#lookups-provider" },
                    { title: "Get partner balances", href: "/developers/api-reference/mto-api#user-balances" },
                    { title: "Create merchant profile", href: "/developers/api-reference/mto-api#create-merchant" },
                    { title: "Add payout bank account", href: "/developers/api-reference/mto-api#add-settlement-account" },
                    { title: "Get payout history", href: "/developers/api-reference/mto-api#mto-payouts" },
                    { title: "Get exchange rate (v1)", href: "/developers/api-reference/mto-api#get-rate" },
                    { title: "Create transaction (v1)", href: "/developers/api-reference/mto-api#create-transaction" },
                    { title: "Validate bank account", href: "/developers/api-reference/mto-api#validate-bank" },
                    { title: "Get lookups", href: "/developers/api-reference/mto-api#get-types" },
                    { title: "Get transaction detail", href: "/developers/api-reference/mto-api#get-transaction" },
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
    const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash : ""));

    useEffect(() => {
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
                            {group.title && (
                                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground ml-2">
                                    {group.title}
                                </h4>
                            )}
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
