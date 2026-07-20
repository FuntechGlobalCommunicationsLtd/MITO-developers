"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { DocsPage, DocsPageHeader, DocsInlineCode } from "@/components/developers/DocsPage";
import {
    GuideIntro,
    GuideOptionsChooser,
    GuideOptionDetail,
    GuideApisInvolved,
    GuideRelatedHelpers,
} from "@/components/developers/PartnerGuideBlocks";
import type { GuideApiEntry } from "@/components/developers/IntegrationGuide";

const RATES_APIS: GuideApiEntry[] = [
    { method: "GET", path: "/api/v1/mito/Exchange/corridors", title: "Get corridors (Retail)", href: "/developers/api-reference/retail-api#get-corridors" },
    { method: "POST", path: "/api/v1/mito/Exchange/rates", title: "Validate rates (Retail)", href: "/developers/api-reference/retail-api#post-rates" },
    { method: "GET", path: "/Mto/GetRate", title: "Get rates (MTO)", href: "/developers/api-reference/mto-api#get-rate" },
];

export default function RatesHelperPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Helper methods · Rates"
                        title="Rates"
                        description="Partner-facing FX quotes before create transaction. Retail returns rateId; MTO returns corridor rates for submit."
                    />

                    <GuideIntro
                        covers={[
                            "When to fetch a quote (before create)",
                            "Retail rateId vs MTO GetRate / FTP rates",
                            "APIs involved",
                        ]}
                    >
                        <p>
                            Always obtain a quote from MITO before creating a remittance. Do not invent rates client-side.
                            Retail create requires a validated <DocsInlineCode>rateId</DocsInlineCode>. Environments and full
                            remittance workflows live on the{" "}
                            <a href="/developers/guides/retail" className="text-primary font-semibold hover:underline">
                                Retail
                            </a>{" "}
                            /{" "}
                            <a href="/developers/guides/mto" className="text-primary font-semibold hover:underline">
                                MTO
                            </a>{" "}
                            guides.
                        </p>
                    </GuideIntro>

                    <GuideOptionsChooser
                        title="Where rates apply"
                        description="Use the path that matches your integration."
                        options={[
                            { href: "#rates-retail", title: "Retail quote", description: "POST Exchange/rates → rateId on create." },
                            { href: "#rates-mto", title: "MTO rates", description: "GetRate / FTP rate files before submit." },
                        ]}
                    />
                </section>

                <GuideOptionDetail
                    id="rates-retail"
                    title="1) Retail quote"
                    overview={
                        <>
                            <DocsInlineCode>POST /api/v1/mito/Exchange/rates</DocsInlineCode> returns quote fields and an{" "}
                            <DocsInlineCode>id</DocsInlineCode> used as <DocsInlineCode>rateId</DocsInlineCode> on create.
                            May include <DocsInlineCode>isKycRequired</DocsInlineCode>.
                        </>
                    }
                    sequence={[
                        <><DocsInlineCode>GET /api/v1/mito/Exchange/corridors</DocsInlineCode></>,
                        <><DocsInlineCode>GET /api/v1/mito/Lookups/provider</DocsInlineCode> (as needed)</>,
                        <><DocsInlineCode>POST /api/v1/mito/Exchange/rates</DocsInlineCode></>,
                        <>Create transaction with rateId</>,
                    ]}
                    partnerNotes={[<>Refresh expired quotes before create.</>, <>Handle isKycRequired via KYC helper.</>]}
                    mitoNotes={[<>Return locked quote id and breakdown.</>, <>Reject create with invalid/expired rateId.</>]}
                />

                <GuideOptionDetail
                    id="rates-mto"
                    title="2) MTO rates"
                    overview="Pull live rates via REST (GetRate) or consume rate files from SFTP outbox, then submit with the agreed rate."
                    sequence={[
                        <>Authenticate.</>,
                        <><DocsInlineCode>GET /Mto/GetRate</DocsInlineCode> or download FTP rates.</>,
                        <>Submit transfer with Rate on payload.</>,
                    ]}
                    partnerNotes={[<>Keep rate source and submit close in time.</>]}
                    mitoNotes={[<>Publish live rates / FTP rate files.</>]}
                />

                <GuideApisInvolved apiRefHref="/developers/api-reference/retail-api#post-rates" apiRefLabel="Retail / MTO rate APIs" flat={RATES_APIS} />

                <GuideRelatedHelpers
                    items={[
                        { href: "/developers/kyc", title: "KYC", description: "When isKycRequired is true" },
                        { href: "/developers/guides/retail", title: "Retail", description: "Full remittance guide" },
                        { href: "/developers/guides/mto", title: "MTO", description: "API · FTP" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
