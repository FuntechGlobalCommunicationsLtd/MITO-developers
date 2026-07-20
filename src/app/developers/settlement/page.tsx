"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { DocsPage, DocsPageHeader, DocsInlineCode } from "@/components/developers/DocsPage";
import {
    GuideIntro,
    GuideOptionsChooser,
    GuideOptionDetail,
    GuideRelatedHelpers,
} from "@/components/developers/PartnerGuideBlocks";

export default function SettlementPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Helper methods · Settlement"
                        title="Settlement"
                        description="How collected funds become available in your wallet and move to your bank. Pair with Wallets, Payouts, and Webhooks."
                    />

                    <GuideIntro
                        covers={[
                            "When funds are available to withdraw",
                            "Biller vs MTO settlement paths",
                            "Which helpers / APIs to use next",
                        ]}
                    >
                        <p>
                            Settlement is collect → confirm → available in wallet → withdraw. Never mark funds settled on
                            redirect alone. Detailed collect workflows stay on the Biller / MTO guides; this page maps
                            settlement responsibilities only.
                        </p>
                    </GuideIntro>

                    <GuideOptionsChooser
                        title="Settlement paths"
                        description="Confirm via notifications, then balances → payout."
                        options={[
                            { href: "#settlement-biller", title: "Biller settlement", description: "Business collect → CreatePayout." },
                            { href: "#settlement-mto", title: "MTO / Collection", description: "payout/balances + withdrawal / payout_*." },
                        ]}
                    />

                    <div id="confirmation" className="space-y-3 scroll-mt-24">
                        <h2 className="text-xl font-bold">Confirmation signals</h2>
                        <p className="text-muted-foreground">
                            Biller: <DocsInlineCode>PAYMENT_CAPTURED</DocsInlineCode> /{" "}
                            <DocsInlineCode>TRANSACTION_COMPLETED</DocsInlineCode>. Retail/MTO: outbound{" "}
                            <DocsInlineCode>eventType</DocsInlineCode> / <DocsInlineCode>payout_*</DocsInlineCode>. Full
                            catalogs:{" "}
                            <Link href="/developers/webhooks" className="text-primary font-semibold hover:underline">
                                Webhooks
                            </Link>
                            .
                        </p>
                    </div>
                </section>

                <GuideOptionDetail
                    id="settlement-biller"
                    title="1) Biller settlement"
                    overview="Initiate collection, confirm capture, read Business balances, CreatePayout to corporate account."
                    sequence={[
                        <>InitiateTransactions + callbackurl.</>,
                        <>Confirm notification / GetTransactionStatus.</>,
                        <>GET balances → CreatePayout.</>,
                    ]}
                    partnerNotes={[<>Reconcile with payout report.</>]}
                    mitoNotes={[<>Credit wallet and process CreatePayout.</>]}
                />

                <GuideOptionDetail
                    id="settlement-mto"
                    title="2) MTO / Collection settlement"
                    overview="Use MTO Collection balances and payout webhooks; corporate withdrawal via Business payout APIs when applicable."
                    sequence={[
                        <>Complete collection or MTO submit.</>,
                        <>Read GET /api/v2/payout/balances.</>,
                        <>Track payout_* outbound webhooks / CreatePayout.</>,
                    ]}
                    partnerNotes={[<>See Payouts helper for Api List.</>]}
                    mitoNotes={[<>Publish balances and payout status events.</>]}
                />

                <GuideRelatedHelpers
                    items={[
                        { href: "/developers/wallets", title: "Wallets", description: "Balance APIs" },
                        { href: "/developers/payouts", title: "Payouts", description: "Api List + withdrawal" },
                        { href: "/developers/webhooks", title: "Webhooks", description: "Confirm before settle" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
