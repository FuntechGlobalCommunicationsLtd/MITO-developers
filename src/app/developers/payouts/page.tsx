"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { DocsPage, DocsPageHeader, DocsInlineCode, DocsTable, DocsCallout } from "@/components/developers/DocsPage";
import {
    GuideIntro,
    GuideOptionsChooser,
    GuideOptionDetail,
    GuideApisInvolved,
    GuideRelatedHelpers,
} from "@/components/developers/PartnerGuideBlocks";
import type { GuideApiEntry } from "@/components/developers/IntegrationGuide";

const MTO_COLLECTION_API_LIST = "https://furp02-staging.funtechcom.com/mtocollection.html#tag/Api-List";

const COLLECTION_APIS: GuideApiEntry[] = [
    { method: "POST", path: "/api/v1/mito/CreateMerchantProfile", title: "Create merchant profile", href: "https://furp02-staging.funtechcom.com/mtocollection.html#operation/createMerchantProfile" },
    { method: "GET", path: "/api/v1/mito/GetPaymentMethods", title: "Get payment methods", href: "https://furp02-staging.funtechcom.com/mtocollection.html#operation/getPaymentMethods" },
    { method: "POST", path: "/api/v1/mito/InitiateTransactions", title: "Initiate transactions", href: "https://furp02-staging.funtechcom.com/mtocollection.html#operation/InitiateTransactions" },
    { method: "GET", path: "/api/v1/mito/GetTransactionStatus", title: "Get transaction status", href: "https://furp02-staging.funtechcom.com/mtocollection.html#operation/GetTransactionStatus" },
    { method: "GET", path: "/api/v1/mito/PaymentConfirmation", title: "Payment confirmation", href: "https://furp02-staging.funtechcom.com/mtocollection.html#operation/PaymentConfirmation" },
    { method: "GET", path: "/api/v2/payout/balances", title: "Balances", href: "https://furp02-staging.funtechcom.com/mtocollection.html#operation/balances" },
];

const WITHDRAWAL_APIS: GuideApiEntry[] = [
    { method: "POST", path: "/api/v2/Payout/AddPayoutAccount", title: "Add payout account", href: "/developers/api-reference/biller-api#add-payout-account" },
    { method: "POST", path: "/api/v2/payout/CreatePayout", title: "Create payout", href: "/developers/api-reference/biller-api#create-payout" },
    { method: "GET", path: "/api/v2/payout/report", title: "Payout report", href: "/developers/api-reference/biller-api#get-payout-report" },
];

export default function PayoutsHelperPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Helper methods · Payouts"
                        title="Payouts"
                        description={
                            <>
                                Affiliate Payment Collection → balances, plus corporate withdrawal. Source Api List:{" "}
                                <a
                                    href={MTO_COLLECTION_API_LIST}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary font-semibold hover:underline"
                                >
                                    mtocollection.html
                                </a>
                                .
                            </>
                        }
                    />

                    <GuideIntro
                        covers={[
                            "MTO Collection Api List (six operations)",
                            "Corporate CreatePayout (Business APIs)",
                            "Auth and notification pointers",
                        ]}
                    >
                        <p>
                            Use the MTO Collection Api List for collect and{" "}
                            <DocsInlineCode>GET /api/v2/payout/balances</DocsInlineCode>. CreatePayout is outside that Api
                            List — documented under Business / Biller payout APIs. Full hosted collect UX lives on the{" "}
                            <Link href="/developers/guides/biller" className="text-primary font-semibold hover:underline">
                                Biller guide
                            </Link>
                            .
                        </p>
                        <DocsCallout title="Spec note">
                            <p>
                                Redoc Api List has six operations only (no Auth/login tag, no CreatePayout). Auth is under
                                Api Integration; withdrawal is the Business payout contract.
                            </p>
                        </DocsCallout>
                    </GuideIntro>

                    <GuideOptionsChooser
                        title="Payout options"
                        description="Collection Api List vs corporate withdrawal."
                        options={[
                            { href: "#payouts-collection", title: "MTO Collection Api List", description: "Collect + balances (mtocollection)." },
                            { href: "#payouts-withdrawal", title: "Corporate withdrawal", description: "CreatePayout Business APIs." },
                        ]}
                    />

                    <div id="authentication" className="space-y-3 scroll-mt-24">
                        <h2 className="text-xl font-bold">Authentication</h2>
                        <p className="text-muted-foreground">
                            Collection: JWT via Auth/login + BillerId (several ops also show Basic). Withdrawal: Basic Auth +
                            AccessAffiliateNumber.
                        </p>
                        <DocsTable
                            headers={["Header", "Value"]}
                            rows={[
                                [
                                    <span key="a" className="font-mono text-xs text-primary">
                                        Authorization
                                    </span>,
                                    <span key="av" className="text-muted-foreground">
                                        Bearer or Basic
                                    </span>,
                                ],
                                [
                                    <span key="b" className="font-mono text-xs text-primary">
                                        BillerId
                                    </span>,
                                    <span key="bv" className="text-muted-foreground">
                                        Required on Collection Api List
                                    </span>,
                                ],
                            ]}
                        />
                    </div>

                    <div id="notifications" className="space-y-3 scroll-mt-24">
                        <h2 className="text-xl font-bold">Notifications</h2>
                        <p className="text-muted-foreground">
                            Collection uses callback <DocsInlineCode>NotificationType</DocsInlineCode>s. See{" "}
                            <Link
                                href="/developers/webhooks#callback-notifications"
                                className="text-primary font-semibold hover:underline"
                            >
                                callback notifications
                            </Link>
                            .
                        </p>
                    </div>
                </section>

                <GuideOptionDetail
                    id="payouts-collection"
                    title="1) MTO Collection Api List"
                    overview="Exact six operations under the Redoc Api List tag — merchant, payment methods, initiate, status, confirmation, balances."
                    sequence={[
                        <>CreateMerchantProfile (optional).</>,
                        <>GetPaymentMethods.</>,
                        <>InitiateTransactions.</>,
                        <>GetTransactionStatus / PaymentConfirmation.</>,
                        <>GET /api/v2/payout/balances (Currency, ledgerBalance, settledBalance).</>,
                    ]}
                    partnerNotes={[<>Open staging Redoc for full schemas.</>, <>Configure callbackurl.</>]}
                    mitoNotes={[<>Expose Api List operations and notifications.</>]}
                />

                <GuideOptionDetail
                    id="payouts-withdrawal"
                    title="2) Corporate withdrawal"
                    overview="Not in mtocollection Api List. Register account, CreatePayout, reconcile with report — Basic Auth Business contract."
                    sequence={[
                        <>POST /api/v2/Payout/AddPayoutAccount.</>,
                        <>POST /api/v2/payout/CreatePayout.</>,
                        <>GET /api/v2/payout/report.</>,
                    ]}
                    partnerNotes={[<>Check settled balance first.</>]}
                    mitoNotes={[<>Process payout to approved account.</>]}
                />

                <GuideApisInvolved
                    id="apis-involved"
                    apiRefHref={MTO_COLLECTION_API_LIST}
                    apiRefLabel="MTO Collection Api List"
                    groups={[
                        { id: "apis-workflow", title: "Collection Api List", description: "From mtocollection.html", apis: COLLECTION_APIS },
                        { id: "apis-helper", title: "Corporate withdrawal", description: "Business / Biller payout APIs", apis: WITHDRAWAL_APIS },
                    ]}
                />

                <GuideRelatedHelpers
                    items={[
                        { href: "/developers/wallets", title: "Wallets", description: "Balance model" },
                        { href: "/developers/settlement", title: "Settlement", description: "Collect → bank" },
                        { href: "/developers/webhooks", title: "Webhooks", description: "Callbacks" },
                        { href: "/developers/guides/biller", title: "Biller", description: "Business collect path" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
