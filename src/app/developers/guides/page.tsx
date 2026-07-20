"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { PARTNER_API_BASE_URLS } from "@/lib/partner-api-overview";
import {
    DocsPage,
    DocsPageHeader,
    DocsSection,
    DocsTable,
    DocsTopicCard,
    DocsTopicStack,
} from "@/components/developers/DocsPage";

/** Sidebar order: Overview → Biller → Retail → MTO → Webhooks */
const integrationMethods = [
    {
        title: "Overview",
        description: "Base URLs, auth types, and how to choose a partner path.",
        href: "/developers/guides#api-endpoints",
    },
    {
        title: "Biller",
        description: "Collect on your site with a registered Biller ID. Auth: Basic Auth.",
        href: "/developers/guides/biller",
        options: [
            { title: "Wholesale", href: "/developers/guides/wholesale" },
            { title: "Merchant", href: "/developers/guides/merchant" },
        ],
    },
    {
        title: "Retail",
        description: "C2C remittance for end customers. Auth: JWT.",
        href: "/developers/guides/retail",
        options: [
            { title: "Hosted", href: "/developers/guides/retail#retail-hosted-pages" },
            { title: "SDK", href: "/developers/guides/retail#retail-widget" },
            { title: "API", href: "/developers/guides/retail#retail-full-api" },
        ],
    },
    {
        title: "MTO",
        description: "Bulk remittance via REST API or FTP batch. Auth: JWT / Bearer.",
        href: "/developers/guides/mto",
        options: [
            { title: "API", href: "/developers/api-reference/mto-api" },
            { title: "FTP", href: "/developers/file-integration/mto-ftp" },
        ],
    },
    {
        title: "Webhooks",
        description: "Catalog of outbound eventTypes and Biller NotificationTypes.",
        href: "/developers/webhooks",
        options: [
            { title: "Outbound eventTypes", href: "/developers/webhooks#outbound-webhooks" },
            { title: "Callback NotificationTypes", href: "/developers/webhooks#callback-notifications" },
        ],
    },
];

/** Sidebar order: Rates → Wallets → KYC → Settlement → Payouts */
const helperMethods = [
    {
        title: "Rates",
        description: "FX quotes, corridors, and rateId before create transaction.",
        href: "/developers/rates",
        options: [
            { title: "Retail quote", href: "/developers/rates#rates-retail" },
            { title: "MTO rates", href: "/developers/rates#rates-mto" },
        ],
    },
    {
        title: "Wallets",
        description: "Partner-visible balances after collections settle.",
        href: "/developers/wallets",
        options: [
            { title: "MTO Collection", href: "/developers/wallets#wallets-collection" },
            { title: "Biller", href: "/developers/wallets#wallets-biller" },
            { title: "Retail", href: "/developers/wallets#wallets-retail" },
        ],
    },
    {
        title: "KYC",
        description: "Sender identity checks for retail and hosted / SDK capture.",
        href: "/developers/kyc",
        options: [
            { title: "SDK / Hosted", href: "/developers/kyc#kyc-sdk" },
            { title: "Full API", href: "/developers/kyc#kyc-api" },
        ],
    },
    {
        title: "Settlement",
        description: "How collected funds become available and move to your bank.",
        href: "/developers/settlement",
        options: [
            { title: "Biller settlement", href: "/developers/settlement#settlement-biller" },
            { title: "MTO / Collection", href: "/developers/settlement#settlement-mto" },
        ],
    },
    {
        title: "Payouts",
        description: "MTO Collection Api List, payout balances, and corporate withdrawal.",
        href: "/developers/payouts",
        options: [
            { title: "Collection Api List", href: "/developers/payouts#payouts-collection" },
            { title: "Corporate withdrawal", href: "/developers/payouts#payouts-withdrawal" },
        ],
    },
];

export default function GuidesIndexPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <DocsPageHeader
                    eyebrow="Documentation"
                    title="Integration & helper methods"
                    description={
                        <>
                            Choose an integration path, then use helpers for rates, wallets, KYC, settlement, and
                            payouts. Flows follow{" "}
                            <strong className="text-foreground">Collect → Process / Forex → Disburse</strong>.
                        </>
                    }
                >
                    <p className="text-muted-foreground mt-4">
                        Endpoint specs:{" "}
                        <Link
                            href="/developers/api-reference"
                            className="text-primary font-semibold hover:underline"
                        >
                            API Reference
                        </Link>
                    </p>
                </DocsPageHeader>

                <DocsSection
                    id="api-endpoints"
                    title="API endpoints"
                    description="Base URLs for staging and live. Use the matching credentials and auth method for each partner."
                >
                    <DocsTable
                        headers={["Partner", "Auth", "Staging", "Live"]}
                        rows={PARTNER_API_BASE_URLS.map((row) => [
                            <Link key={row.id} href={row.guideHref} className="font-semibold hover:text-primary">
                                {row.title}
                            </Link>,
                            <Link
                                key={`${row.id}-auth`}
                                href={row.authHref}
                                className="text-primary font-medium hover:underline"
                            >
                                {row.authType}
                            </Link>,
                            <span key={`${row.id}-s`} className="font-mono text-xs text-muted-foreground break-all">
                                {row.staging}
                            </span>,
                            <span key={`${row.id}-l`} className="font-mono text-xs text-muted-foreground break-all">
                                {row.live}
                            </span>,
                        ])}
                    />
                    <p className="text-sm text-muted-foreground">
                        Credentials and first request:{" "}
                        <Link
                            href="/developers/get-started#environments"
                            className="text-primary font-semibold hover:underline"
                        >
                            Getting Started · Environments
                        </Link>
                    </p>
                </DocsSection>

                <DocsSection
                    id="methods"
                    title="Integration methods"
                    description="Partner paths in sidebar order. Open a card for the guide, or use a chip for a delivery option."
                >
                    <DocsTopicStack>
                        {integrationMethods.map((item) => (
                            <DocsTopicCard
                                key={item.href + item.title}
                                href={item.href}
                                title={item.title}
                                description={item.description}
                                options={item.options}
                            />
                        ))}
                    </DocsTopicStack>
                </DocsSection>

                <DocsSection
                    id="helpers"
                    title="Helper methods"
                    description="Shared capabilities used across partner paths. Same layout and order as Integration methods."
                >
                    <DocsTopicStack>
                        {helperMethods.map((item) => (
                            <DocsTopicCard
                                key={item.href + item.title}
                                href={item.href}
                                title={item.title}
                                description={item.description}
                                options={item.options}
                            />
                        ))}
                    </DocsTopicStack>
                </DocsSection>
            </DocsPage>
        </DocsLayout>
    );
}
