"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";
import { DocsPage, DocsPageHeader, DocsInlineCode, DocsTable } from "@/components/developers/DocsPage";
import {
    GuideIntro,
    GuideWorkflow,
    GuideOptionsChooser,
    GuideOptionDetail,
    GuideApisInvolved,
    GuideRelatedHelpers,
} from "@/components/developers/PartnerGuideBlocks";
import type { GuideApiGroup } from "@/components/developers/IntegrationGuide";

const BILLER_API_GROUPS: GuideApiGroup[] = [
    {
        id: "apis-workflow",
        title: "Workflow APIs",
        description: "Basic Auth first, then collect → confirm → settle.",
        apis: [
            { method: "POST", path: "Basic Auth + AccessAffiliateNumber", title: "Authenticate (Biller)", href: "/developers/api-reference/biller-api#auth" },
            { method: "POST", path: "/api/v2/Business/InitiateTransactions", title: "Initiate collection", href: "/developers/api-reference/biller-api#initiate-transaction" },
            { method: "GET", path: "/api/v2/Business/GetTransactionStatus", title: "Transaction status", href: "/developers/api-reference/biller-api#get-status" },
            { method: "GET", path: "/api/v2/Business/PaymentConfirmation", title: "Payment confirmation", href: "/developers/api-reference/biller-api#payment-confirmation" },
            { method: "GET", path: "/api/v2/Business/SwitchPaymentMode", title: "Switch payment mode", href: "/developers/api-reference/biller-api#switch-payment-mode" },
            { method: "POST", path: "/api/v2/payout/CreatePayout", title: "Create payout", href: "/developers/api-reference/biller-api#create-payout" },
        ],
    },
    {
        id: "apis-helper",
        title: "Helper APIs",
        description: "Lookup, reconciliation, account setup, reports, and refunds.",
        apis: [
            { method: "GET", path: "/api/v2/Business/GetTransactions", title: "List transactions", href: "/developers/api-reference/biller-api#get-transactions" },
            { method: "GET", path: "/api/v2/Business/balances", title: "Wallet balances", href: "/developers/api-reference/biller-api#get-balances" },
            { method: "POST", path: "/api/v2/Payout/AddPayoutAccount", title: "Add payout account", href: "/developers/api-reference/biller-api#add-payout-account" },
            { method: "GET", path: "/api/v2/payout/GetPayoutAccounts", title: "Get payout accounts", href: "/developers/api-reference/biller-api#get-payout-accounts" },
            { method: "GET", path: "/api/v2/payout/report", title: "Payout report", href: "/developers/api-reference/biller-api#get-payout-report" },
            { method: "POST", path: "/api/v2/Refund/CreateRefund", title: "Create refund", href: "/developers/api-reference/biller-api#create-refund" },
            { method: "GET", path: "/api/v2/Refund/GetRefund", title: "Get refund details", href: "/developers/api-reference/biller-api#get-refund" },
            { method: "GET", path: "/api/v2/Refund/GetRefundList", title: "List refunds", href: "/developers/api-reference/biller-api#get-refund-list" },
        ],
    },
];

export default function BillerAffiliateGuidePage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Integration methods · Biller"
                        title="Biller partner integration"
                        description="Partner-facing contract for payment collection: authenticate, initiate a collection, confirm capture, then settle to your corporate bank account."
                    />

                    <GuideIntro
                        covers={[
                            "Overall partner workflow and integration options",
                            "Authentication and callback notifications",
                            "Per-option workflow diagrams, API sequences, and responsibilities",
                        ]}
                    >
                        <p>
                            Biller partners collect payments on their site for goods or services. MITO handles payment
                            capture; you settle to an approved corporate bank account. Every transaction must include your
                            registered Biller ID.
                        </p>
                        <p>
                            Endpoint schemas:{" "}
                            <Link href="/developers/api-reference/biller-api" className="text-primary font-semibold hover:underline">
                                Biller API reference
                            </Link>
                            .
                        </p>
                    </GuideIntro>

                    <GuideWorkflow
                        description="Checkout UI differs by option; collect → confirm → settle does not."
                        diagram={
                            <FlowDiagram title="Biller partner contract">
                                <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-4">
                                    <FlowNode label="Authenticate" sublabel="Basic Auth" type="user" />
                                    <FlowArrow direction="right" label="BillerId" />
                                    <FlowNode label="Initiate" sublabel="InitiateTransactions" type="MITO" />
                                    <FlowArrow direction="right" label="Pay" />
                                    <FlowNode label="Confirm" sublabel="Status / callback" type="secondary" />
                                    <FlowArrow direction="right" label="Payout" />
                                    <FlowNode label="Your bank" sublabel="CreatePayout" type="primary" />
                                </div>
                            </FlowDiagram>
                        }
                        steps={[
                            <>Authenticate with Basic Auth + <DocsInlineCode>AccessAffiliateNumber</DocsInlineCode>.</>,
                            <>Call <DocsInlineCode>InitiateTransactions</DocsInlineCode> with billerId, amount, and callbackurl.</>,
                            <>Customer completes hosted or bank payment.</>,
                            <>Confirm via callback notification or GetTransactionStatus before releasing goods.</>,
                            <>Read balances and CreatePayout to your corporate account when ready.</>,
                        ]}
                    />

                    <GuideOptionsChooser
                        description="Pick one model below. Each detail section uses Overview, Workflow Diagram, API Sequence, and Notes & Responsibilities."
                        options={[
                            {
                                href: "#biller-hosted",
                                title: "Hosted checkout",
                                description: "Redirect to MITO payment pages via redirectUrl.",
                            },
                            {
                                href: "#biller-api",
                                title: "Full API",
                                description: "Server-side initiation, status, confirmation, and payout.",
                            },
                            {
                                href: "#biller-wholesale",
                                title: "Wholesale / Merchant",
                                description: "Sub-merchant or single-merchant variants.",
                            },
                        ]}
                        footnote={
                            <>
                                Shared prerequisites: biller credentials, registered Biller ID, approved payout account,
                                HTTPS <DocsInlineCode>callbackurl</DocsInlineCode>.
                            </>
                        }
                    />

                    <div id="api-contract" className="space-y-6 scroll-mt-24">
                        <div>
                            <h2 className="text-xl font-bold">API contract</h2>
                            <p className="text-muted-foreground mt-2">
                                Shared rules below. Full schemas:{" "}
                                <Link href="/developers/api-reference/biller-api" className="text-primary font-semibold hover:underline">
                                    Biller API reference
                                </Link>
                                .
                            </p>
                        </div>

                        <div id="authentication" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Authentication (Basic Auth)</h3>
                            <p className="text-muted-foreground">
                                Biller uses Basic Authentication (not JWT). Encode <DocsInlineCode>username:password</DocsInlineCode> as
                                Base64 and send <DocsInlineCode>AccessAffiliateNumber</DocsInlineCode> on every Business / payout / refund request.
                            </p>
                            <DocsTable
                                headers={["Header", "Value"]}
                                rows={[
                                    [
                                        <span className="font-mono text-primary text-xs">Authorization</span>,
                                        <span className="text-muted-foreground">Basic &lt;base64(username:password)&gt;</span>,
                                    ],
                                    [
                                        <span className="font-mono text-primary text-xs">AccessAffiliateNumber</span>,
                                        <span className="text-muted-foreground">Your affiliate collector number</span>,
                                    ],
                                    [
                                        <span className="font-mono text-primary text-xs">Content-Type</span>,
                                        <span className="text-muted-foreground">application/json</span>,
                                    ],
                                ]}
                            />
                        </div>

                        <div id="webhooks" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Callback notifications</h3>
                            <p className="text-muted-foreground">
                                Pass <DocsInlineCode>callbackurl</DocsInlineCode> on InitiateTransactions. MITO POSTs{" "}
                                <DocsInlineCode>NotificationType</DocsInlineCode> + <DocsInlineCode>Body</DocsInlineCode>. Redirect alone is not final.
                            </p>
                            <DocsTable
                                headers={["NotificationType", "When"]}
                                rows={[
                                    ["PAYMENT_CAPTURED", "Payment successfully captured"],
                                    ["TRANSACTION_COMPLETED", "Collection completed"],
                                    ["TRANSACTION_FAILED / TRANSACTION_EXPIRED", "Terminal failure"],
                                    ["AWAITING_CONFIRMATION", "Awaiting partner confirmation"],
                                ].map(([t, w]) => [
                                    <span key={t} className="font-mono text-xs text-primary">{t}</span>,
                                    <span key={`${t}-w`} className="text-muted-foreground">{w}</span>,
                                ])}
                            />
                            <p className="text-sm text-muted-foreground">
                                Details:{" "}
                                <Link href="/developers/webhooks#callback-notifications" className="text-primary font-semibold hover:underline">
                                    Webhooks & notifications
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                <GuideOptionDetail
                    id="biller-hosted"
                    title="1) Hosted checkout"
                    overview="Redirect the customer to MITO using the redirectUrl returned from InitiateTransactions. MITO hosts payment UI and PCI scope."
                    diagram={
                        <FlowDiagram title="Biller hosted flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Your site" sublabel="InitiateTransactions" type="user" />
                                <FlowArrow direction="right" label="redirectUrl" />
                                <FlowNode label="MITO checkout" sublabel="Pay" type="MITO" />
                                <FlowArrow direction="right" label="Return + callback" />
                                <FlowNode label="Your site" sublabel="Confirm status" type="secondary" />
                            </div>
                        </FlowDiagram>
                    }
                    sequence={[
                        <>Authenticate with Basic Auth + AccessAffiliateNumber.</>,
                        <><DocsInlineCode>POST /api/v2/Business/InitiateTransactions</DocsInlineCode> with callbackurl and redirectUrl.</>,
                        <>Redirect customer to the returned payment URL.</>,
                        <>Confirm with callback notification and/or GetTransactionStatus.</>,
                    ]}
                    partnerNotes={[
                        <>Use HTTPS public callbackurl.</>,
                        <>Do not release goods on redirect alone.</>,
                        <>Store partnerReferenceNumber for reconciliation.</>,
                    ]}
                    mitoNotes={[
                        <>Host payment pages and return redirectUrl.</>,
                        <>Deliver callback notifications.</>,
                        <>Expose status and balance APIs.</>,
                    ]}
                />

                <GuideOptionDetail
                    id="biller-api"
                    title="2) Full API"
                    overview="Full server-side orchestration: initiate, poll/confirm, balances, payouts, and refunds."
                    diagram={
                        <FlowDiagram title="Biller full API flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Partner backend" sublabel="Business APIs" type="user" />
                                <FlowArrow direction="right" label="REST" />
                                <FlowNode label="MITO" sublabel="Collect + settle" type="MITO" />
                                <FlowArrow direction="right" label="Callbacks" />
                                <FlowNode label="Partner webhook" sublabel="Notifications" type="secondary" />
                            </div>
                        </FlowDiagram>
                    }
                    sequence={[
                        <>Authenticate.</>,
                        <><DocsInlineCode>InitiateTransactions</DocsInlineCode>.</>,
                        <><DocsInlineCode>GetTransactionStatus</DocsInlineCode> / PaymentConfirmation as needed.</>,
                        <><DocsInlineCode>GET balances</DocsInlineCode> then <DocsInlineCode>CreatePayout</DocsInlineCode>.</>,
                    ]}
                    partnerNotes={[
                        <>Implement idempotent partner references.</>,
                        <>Reconcile with GetTransactions and payout report.</>,
                    ]}
                    mitoNotes={[
                        <>Stable Business / payout / refund contract.</>,
                        <>Async notifications for status changes.</>,
                    ]}
                />

                <GuideOptionDetail
                    id="biller-wholesale"
                    title="3) Wholesale / Merchant"
                    overview="Wholesale aggregates sub-merchants; Merchant is a single-merchant checkout path. Same collect → settle contract with program-specific onboarding."
                    diagram={
                        <FlowDiagram title="Wholesale / Merchant">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Merchant / sub-merchant" sublabel="Checkout" type="user" />
                                <FlowArrow direction="right" label="Collect" />
                                <FlowNode label="MITO" sublabel="Biller APIs" type="MITO" />
                                <FlowArrow direction="right" label="Settle" />
                                <FlowNode label="Affiliate bank" sublabel="Payout" type="secondary" />
                            </div>
                        </FlowDiagram>
                    }
                    sequence={[
                        <>Follow Wholesale or Merchant guide for program-specific setup.</>,
                        <>Use the same Initiate / status / payout APIs as Full API.</>,
                    ]}
                    partnerNotes={[
                        <>
                            See{" "}
                            <Link href="/developers/guides/wholesale" className="text-primary font-semibold hover:underline">
                                Wholesale
                            </Link>{" "}
                            and{" "}
                            <Link href="/developers/guides/merchant" className="text-primary font-semibold hover:underline">
                                Merchant
                            </Link>{" "}
                            guides.
                        </>,
                    ]}
                    mitoNotes={[<>Provide pooled or single-merchant settlement per program.</>]}
                />

                <GuideApisInvolved
                    apiRefHref="/developers/api-reference/biller-api"
                    apiRefLabel="Biller API reference"
                    groups={BILLER_API_GROUPS}
                />

                <GuideRelatedHelpers
                    items={[
                        { href: "/developers/wallets", title: "Wallets", description: "Balances after collection" },
                        { href: "/developers/payouts", title: "Payouts", description: "Balances and withdrawal" },
                        { href: "/developers/settlement", title: "Settlement", description: "Collect → bank" },
                        { href: "/developers/webhooks", title: "Webhooks", description: "Callback notifications" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
