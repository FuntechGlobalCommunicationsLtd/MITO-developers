"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { DocsPage, DocsPageHeader, DocsInlineCode, DocsTable } from "@/components/developers/DocsPage";
import {
    GuideIntro,
    GuideOptionsChooser,
    GuideOptionDetail,
    GuideApisInvolved,
    GuideRelatedHelpers,
} from "@/components/developers/PartnerGuideBlocks";
import type { GuideApiEntry } from "@/components/developers/IntegrationGuide";

const WALLET_APIS: GuideApiEntry[] = [
    { method: "GET", path: "/api/v2/payout/balances", title: "Payout balances (MTO Collection)", href: "/developers/payouts#payouts-collection" },
    { method: "GET", path: "/api/v2/Business/balances", title: "Biller balances", href: "/developers/api-reference/biller-api#get-balances" },
    { method: "GET", path: "/api/v1/mito/Users/{userId}/balances", title: "Retail user balances", href: "/developers/api-reference/retail-api#get-balances" },
];

export default function WalletsHelperPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Helper methods · Wallets"
                        title="Wallets"
                        description="Partner-visible balances after collections settle. Use before CreatePayout and for daily reconciliation."
                    />

                    <GuideIntro
                        covers={[
                            "Balance endpoints by partner path",
                            "Auth headers for each path",
                            "APIs involved",
                        ]}
                    >
                        <p>
                            Collections credit wallets (minus fees). Payouts debit available balance. Confirm funds moved via{" "}
                            <a href="/developers/webhooks" className="text-primary font-semibold hover:underline">
                                webhooks / notifications
                            </a>
                            , then read balances. Full collect → settle flows live on Biller / MTO / Settlement guides — not
                            repeated here.
                        </p>
                    </GuideIntro>

                    <GuideOptionsChooser
                        title="Where wallets apply"
                        description="Pick the balance API for your partner path."
                        options={[
                            { href: "#wallets-collection", title: "MTO Collection / Payouts", description: "GET /api/v2/payout/balances" },
                            { href: "#wallets-biller", title: "Biller Business", description: "GET /api/v2/Business/balances" },
                            { href: "#wallets-retail", title: "Retail users", description: "Per-user wallet allocation" },
                        ]}
                    />

                    <div id="authentication" className="space-y-3 scroll-mt-24">
                        <h2 className="text-xl font-bold">Authentication</h2>
                        <DocsTable
                            headers={["Path", "Auth"]}
                            rows={[
                                [<span key="1">MTO Collection</span>, <span key="1a" className="text-muted-foreground">JWT / Basic + BillerId</span>],
                                [<span key="2">Biller</span>, <span key="2a" className="text-muted-foreground">Basic + AccessAffiliateNumber</span>],
                                [<span key="3">Retail</span>, <span key="3a" className="text-muted-foreground">JWT Bearer</span>],
                            ]}
                        />
                    </div>
                </section>

                <GuideOptionDetail
                    id="wallets-collection"
                    title="1) MTO Collection / Payouts"
                    overview={
                        <>
                            <DocsInlineCode>GET /api/v2/payout/balances</DocsInlineCode> returns Currency, ledgerBalance,
                            settledBalance. Spec:{" "}
                            <a
                                href="https://furp02-staging.funtechcom.com/mtocollection.html#tag/Api-List"
                                className="text-primary font-semibold hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                mtocollection Api List
                            </a>
                            .
                        </>
                    }
                    sequence={[
                        <>Complete collection + notification.</>,
                        <><DocsInlineCode>GET /api/v2/payout/balances</DocsInlineCode></>,
                        <>Proceed to corporate withdrawal if needed.</>,
                    ]}
                    partnerNotes={[<>Use settledBalance for payout readiness.</>]}
                    mitoNotes={[<>Credit wallet after successful collection.</>]}
                />

                <GuideOptionDetail
                    id="wallets-biller"
                    title="2) Biller Business"
                    overview={
                        <>
                            <DocsInlineCode>GET /api/v2/Business/balances</DocsInlineCode> for operational settlement wallets.
                        </>
                    }
                    sequence={[
                        <>Authenticate Basic Auth.</>,
                        <><DocsInlineCode>GET /api/v2/Business/balances</DocsInlineCode></>,
                        <><DocsInlineCode>CreatePayout</DocsInlineCode> when ready.</>,
                    ]}
                    partnerNotes={[<>Poll before CreatePayout.</>]}
                    mitoNotes={[<>Expose balance and payout report APIs.</>]}
                />

                <GuideOptionDetail
                    id="wallets-retail"
                    title="3) Retail users"
                    overview="Per-user wallet allocation APIs for retail senders (funding accounts / balances)."
                    sequence={[
                        <>JWT auth.</>,
                        <>Get user balances for userId.</>,
                    ]}
                    partnerNotes={[<>Use for sender wallet visibility, not biller settlement.</>]}
                    mitoNotes={[<>Return wallet allocation for the user.</>]}
                />

                <GuideApisInvolved apiRefHref="/developers/payouts#payouts-collection" apiRefLabel="balance endpoints" flat={WALLET_APIS} />

                <GuideRelatedHelpers
                    items={[
                        { href: "/developers/payouts", title: "Payouts", description: "Withdrawal after balances" },
                        { href: "/developers/settlement", title: "Settlement", description: "Collect → bank" },
                        { href: "/developers/webhooks", title: "Webhooks", description: "When funds moved" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
