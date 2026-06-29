"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { ApiModelHub } from "@/components/developers/ApiModelHub";
import { endpointsByPhase, PARTNER_API_PAGES } from "@/lib/api-endpoints";
import Link from "next/link";

function PhasePage({
    phase,
    title,
    description,
}: {
    phase: "collect" | "processForex" | "disburse" | "manage";
    title: string;
    description: string;
}) {
    const endpoints = endpointsByPhase(phase);

    return (
        <DocsLayout>
            <ApiModelHub
                phase="API Reference"
                title={title}
                description={description}
                endpoints={endpoints.map((e) => ({
                    method: e.method,
                    path: e.path,
                    title: e.title,
                    href: e.href,
                }))}
                relatedDocs={[
                    { title: PARTNER_API_PAGES.retail.title, href: PARTNER_API_PAGES.retail.href, description: "All retail endpoints" },
                    { title: PARTNER_API_PAGES.biller.title, href: PARTNER_API_PAGES.biller.href, description: "All biller endpoints" },
                    { title: PARTNER_API_PAGES.mto.title, href: PARTNER_API_PAGES.mto.href, description: "All MTO endpoints" },
                ]}
            />
            <div className="max-w-4xl mt-8 pt-8 border-t text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">Legacy Redoc sources</p>
                <ul className="space-y-1">
                    <li><Link href={PARTNER_API_PAGES.retail.external} className="text-primary hover:underline" target="_blank">Retail — mito.html</Link></li>
                    <li><Link href={PARTNER_API_PAGES.biller.external} className="text-primary hover:underline" target="_blank">Biller — affiliate-payment-collection</Link></li>
                    <li><Link href={PARTNER_API_PAGES.mto.external} className="text-primary hover:underline" target="_blank">MTO — mtoforex.html</Link></li>
                </ul>
            </div>
        </DocsLayout>
    );
}

export default function CollectApiPage() {
    return (
        <PhasePage
            phase="collect"
            title="Collect"
            description="Accept payments and initiate transactions — retail POST /transactions, biller InitiateTransactions, MTO merchant onboarding."
        />
    );
}
