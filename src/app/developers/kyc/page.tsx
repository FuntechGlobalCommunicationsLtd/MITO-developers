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

const KYC_APIS: GuideApiEntry[] = [
    { method: "POST", path: "/api/v1/mito/Users", title: "Create user", href: "/developers/api-reference/retail-api#create-user" },
    { method: "GET", path: "/api/v1/mito/Users/{id}", title: "Get user profile", href: "/developers/api-reference/retail-api#get-user" },
    { method: "POST", path: "/api/v1/mito/Exchange/rates", title: "Validate rate (isKycRequired)", href: "/developers/api-reference/retail-api#post-rates" },
];

export default function KycHelperPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Helper methods · KYC"
                        title="KYC"
                        description="Partner-facing identity checks for retail senders. Hosted / SDK can capture documents; Full API supplies required sender fields."
                    />

                    <GuideIntro
                        covers={[
                            "When KYC is required (isKycRequired on quote)",
                            "SDK / Hosted vs Full API capture",
                            "APIs involved",
                        ]}
                    >
                        <p>
                            After quoting, check <DocsInlineCode>isKycRequired</DocsInlineCode>. Never treat redirect or SDK
                            onSuccess alone as “KYC approved + paid” — confirm via webhooks / status APIs. End-to-end
                            remittance steps live on the{" "}
                            <a href="/developers/guides/retail" className="text-primary font-semibold hover:underline">
                                Retail guide
                            </a>
                            .
                        </p>
                    </GuideIntro>

                    <GuideOptionsChooser
                        title="Where KYC applies"
                        description="Choose how identity is captured for your Retail option."
                        options={[
                            { href: "#kyc-sdk", title: "Retail SDK / Hosted", description: "MITO UI can collect documents." },
                            { href: "#kyc-api", title: "Retail Full API", description: "Partner supplies required sender fields." },
                        ]}
                    />
                </section>

                <GuideOptionDetail
                    id="kyc-sdk"
                    title="1) Retail SDK / Hosted"
                    overview="MITO Link / hosted pages can present KYC capture when required. Partner still creates the transaction server-side."
                    sequence={[
                        <>Create user / quote.</>,
                        <>Create transaction; open SDK or redirect.</>,
                        <>Confirm final status via webhook.</>,
                    ]}
                    partnerNotes={[<>Do not fulfill on onSuccess alone.</>]}
                    mitoNotes={[<>Host KYC capture when required.</>]}
                />

                <GuideOptionDetail
                    id="kyc-api"
                    title="2) Retail Full API"
                    overview="Supply sender identity fields required by the corridor before create succeeds."
                    sequence={[
                        <><DocsInlineCode>POST /api/v1/mito/Users</DocsInlineCode></>,
                        <>Get user profile / KYC status.</>,
                        <>Validate rate; create transaction with required fields.</>,
                    ]}
                    partnerNotes={[<>Store userId for repeat senders.</>]}
                    mitoNotes={[<>Return KYC status fields on user APIs.</>]}
                />

                <GuideApisInvolved apiRefHref="/developers/api-reference/retail-api#create-user" apiRefLabel="Retail API" flat={KYC_APIS} />

                <GuideRelatedHelpers
                    items={[
                        { href: "/developers/rates", title: "Rates", description: "isKycRequired flag" },
                        { href: "/developers/guides/retail", title: "Retail", description: "Full remittance guide" },
                        { href: "/developers/webhooks", title: "Webhooks", description: "Final status" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
