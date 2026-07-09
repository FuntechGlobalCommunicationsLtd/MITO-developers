"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { ApiModelHub } from "@/components/developers/ApiModelHub";
import { endpointsByPhase, PARTNER_API_PAGES } from "@/lib/api-endpoints";

export default function DisburseApiPage() {
    const endpoints = endpointsByPhase("disburse");

    return (
        <DocsLayout>
            <ApiModelHub
                phase="API Reference"
                title="Disburse"
                description="Beneficiary registration, biller payouts, and MTO settlement accounts and payout history."
                endpoints={endpoints.map((e) => ({
                    method: e.method,
                    path: e.path,
                    title: e.title,
                    description: e.description,
                    href: e.href,
                }))}
                relatedDocs={[
                    { title: "Settlement & wallets", href: "/developers/settlement", description: "Wallet and reconciliation model" },
                    { title: PARTNER_API_PAGES.biller.title, href: PARTNER_API_PAGES.biller.href, description: "Biller payout APIs" },
                    { title: PARTNER_API_PAGES.mto.title, href: PARTNER_API_PAGES.mto.href, description: "MTO payout APIs" },
                ]}
            />
        </DocsLayout>
    );
}
