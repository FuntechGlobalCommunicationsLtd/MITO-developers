"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { ApiModelHub } from "@/components/developers/ApiModelHub";
import { endpointsByPhase, PARTNER_API_PAGES } from "@/lib/api-endpoints";
import Link from "next/link";

export default function ProcessForexApiPage() {
    const endpoints = endpointsByPhase("processForex");

    return (
        <DocsLayout>
            <ApiModelHub
                phase="API Reference"
                title="Process / Forex"
                description="Corridor discovery, rate validation, and provider lookup across retail and MTO APIs."
                endpoints={endpoints.map((e) => ({
                    method: e.method,
                    path: e.path,
                    title: e.title,
                    description: e.description,
                    href: e.href,
                }))}
                relatedDocs={[
                    { title: PARTNER_API_PAGES.retail.title, href: PARTNER_API_PAGES.retail.href, description: "Retail FX & corridors" },
                    { title: PARTNER_API_PAGES.mto.title, href: PARTNER_API_PAGES.mto.href, description: "MTO FX workflow" },
                    { title: "FTP rate files", href: "/developers/api-reference/ftp", description: "Outbound rateddMMyyyyHHmmss.csv" },
                ]}
            />
            <div className="max-w-4xl mt-8 pt-8 border-t text-sm text-muted-foreground">
                <p>MTO forex workflow: Auth → corridors → rates → balances. See{" "}
                    <Link href={PARTNER_API_PAGES.mto.external} className="text-primary hover:underline" target="_blank">mtoforex.html</Link>
                </p>
            </div>
        </DocsLayout>
    );
}
