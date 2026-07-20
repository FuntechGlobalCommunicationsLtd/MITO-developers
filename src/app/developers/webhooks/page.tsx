"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";
import { DocsPage, DocsPageHeader, DocsInlineCode, DocsTable, DocsCallout } from "@/components/developers/DocsPage";
import {
    GuideIntro,
    GuideWorkflow,
    GuideOptionsChooser,
    GuideRelatedHelpers,
} from "@/components/developers/PartnerGuideBlocks";

const outboundEvents = [
    {
        id: "outbound-payment",
        group: "Payment",
        events: [
            { type: "payment_initiated", when: "Payment journey started", partners: "Retail" },
            { type: "payment_authorized", when: "Payment authorized (pre-capture)", partners: "Retail" },
            { type: "payment_pending", when: "Payment pending with the collection provider", partners: "Retail" },
            { type: "payment_collected", when: "Customer payment received / collected", partners: "Retail" },
            { type: "payment_failed", when: "Payment declined or failed", partners: "Retail" },
        ],
    },
    {
        id: "outbound-transaction",
        group: "Transaction",
        events: [
            { type: "transaction_initiated", when: "Transaction created (POST create)", partners: "Retail" },
            { type: "transaction_pending", when: "Transaction processing / not yet terminal", partners: "Retail" },
            { type: "awaiting_confirmation", when: "Funds held — partner confirms after their payout", partners: "Retail" },
            { type: "transaction_completed", when: "Terminal success", partners: "Retail" },
            { type: "transaction_failed", when: "Terminal failure", partners: "Retail" },
        ],
    },
    {
        id: "outbound-refund-chargeback",
        group: "Refund & chargeback",
        events: [
            { type: "refund_initiated", when: "Refund started", partners: "Retail" },
            { type: "refund_completed", when: "Refund completed", partners: "Retail" },
            { type: "chargeback_received", when: "Chargeback received", partners: "Retail" },
            { type: "chargeback_resolved", when: "Chargeback resolved", partners: "Retail" },
        ],
    },
    {
        id: "outbound-payout-mto",
        group: "Payout (MTO)",
        events: [
            { type: "payout_initiated", when: "Payout submitted / started", partners: "MTO" },
            { type: "payout_completed", when: "Payout paid successfully", partners: "MTO" },
            { type: "payout_failed", when: "Payout failed", partners: "MTO" },
        ],
    },
] as const;

const callbackNotifications = [
    {
        id: "callback-transaction-lifecycle",
        group: "Transaction lifecycle",
        events: [
            { type: "TRANSACTION_CREATED", when: "Transaction created" },
            { type: "PAYMENT_INPROGRESS", when: "Payment in progress" },
            { type: "PAYMENT_CAPTURED", when: "Payment successfully captured" },
            { type: "AWAITING_CONFIRMATION", when: "Awaiting partner confirmation" },
            { type: "TRANSACTION_UNDERREVIEW", when: "Transaction under review" },
            { type: "TRANSACTION_COMPLETED", when: "Collection / transaction completed" },
            { type: "TRANSACTION_FAILED", when: "Terminal failure" },
            { type: "TRANSACTION_EXPIRED", when: "Transaction expired" },
        ],
    },
    {
        id: "callback-refunds-payouts",
        group: "Refunds & payouts",
        events: [
            { type: "REFUND_COMPLETED", when: "Refund completed" },
            { type: "REFUND_FAILED", when: "Refund failed" },
            { type: "TRANSACTION_OVERPAYMENT_REFUND", when: "Overpayment refund" },
            { type: "TRANSACTION_UNDERPAY_REFUND", when: "Underpayment refund" },
            { type: "TRANSACTION_FAILED_REFUND_CREATED", when: "Refund created after failed transaction" },
            { type: "PAYOUT_COMPLETED", when: "Payout completed" },
            { type: "PAYOUT_FAILED", when: "Payout failed" },
        ],
    },
    {
        id: "callback-onboarding-verification",
        group: "Onboarding & verification",
        events: [
            { type: "USER_ONBOARDING", when: "User onboarding event" },
            { type: "BANK_ACCOUNT_VERIFIED", when: "Bank account verified" },
            { type: "BANK_ACCOUNT_VERIFICATION_FAILED", when: "Bank account verification failed" },
            { type: "BANK_ACCOUNT_PENDING", when: "Bank account verification pending" },
            { type: "ACCOUNT_VERIFICATION_FAILED", when: "Account verification failed" },
            { type: "ADDRESS_VERIFICATION_FAILED", when: "Address verification failed" },
        ],
    },
] as const;

export default function WebhooksPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Integration methods · Webhooks"
                        title="Webhooks & notifications"
                        description="Catalog of every outbound eventType and NotificationType MITO can send to your endpoint. Payload shapes and signature samples live in API documentation."
                    />

                    <GuideIntro
                        covers={[
                            "All outbound webhook eventTypes (Retail + MTO)",
                            "All Biller callback NotificationTypes",
                            "Which channel each partner uses and where to configure the URL",
                        ]}
                    >
                        <p>
                            MITO pushes async status updates to your HTTPS endpoint. There are two partner-facing channels —
                            use the catalog below to know which types you must handle. Redirect / SDK{" "}
                            <DocsInlineCode>onSuccess</DocsInlineCode> is UX-only; confirm final state from these POSTs or
                            status APIs.
                        </p>
                        <DocsCallout title="Code & payloads">
                            <p>
                                Envelope JSON, HMAC verification, and field schemas are in{" "}
                                <Link
                                    href="/developers/api-reference/retail-api#webhook-notification"
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Retail API · Webhook notification
                                </Link>
                                {" · "}
                                <Link
                                    href="/developers/api-reference/manage#webhook-verification"
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Manage · signature verification
                                </Link>
                                .
                            </p>
                        </DocsCallout>
                    </GuideIntro>

                    <GuideWorkflow
                        description="Same partner duty for every channel: accept POST → verify when required → acknowledge 2xx → act idempotently."
                        diagram={
                            <FlowDiagram title="Outbound delivery">
                                <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-4">
                                    <FlowNode label="MITO" sublabel="Status change" type="MITO" />
                                    <FlowArrow direction="right" label="POST" />
                                    <FlowNode label="Your endpoint" sublabel="HTTPS" type="user" />
                                    <FlowArrow direction="right" label="2xx" />
                                    <FlowNode label="Your systems" sublabel="Fulfill / reconcile" type="secondary" />
                                </div>
                            </FlowDiagram>
                        }
                        steps={[
                            <>Configure your HTTPS URL (webhookUrl or callbackurl) when creating the transaction.</>,
                            <>Receive a POST for each status change listed in the catalogs below.</>,
                            <>Acknowledge with 2xx quickly; deduplicate and update your records.</>,
                            <>Optionally re-check with status APIs before releasing value.</>,
                        ]}
                    />

                    <GuideOptionsChooser
                        id="integration-options"
                        title="Notification channels"
                        description="Pick the channel that matches your integration, then implement the event catalog for that channel."
                        options={[
                            {
                                href: "#outbound-webhooks",
                                title: "Outbound webhooks",
                                description: "Retail / MTO — signed envelope with eventType.",
                            },
                            {
                                href: "#callback-notifications",
                                title: "Callback notifications",
                                description: "Biller — NotificationType + Body on callbackurl.",
                            },
                        ]}
                    />

                    <div id="api-contract" className="space-y-6 scroll-mt-24">
                        <div>
                            <h2 className="text-xl font-bold">Delivery contract</h2>
                            <p className="text-muted-foreground mt-2">
                                Shared rules. Implementation samples stay in API documentation.
                            </p>
                        </div>

                        <div id="authentication" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Security</h3>
                            <DocsTable
                                headers={["Channel", "How you verify"]}
                                rows={[
                                    [
                                        <span className="font-semibold">Outbound webhooks</span>,
                                        <span className="text-muted-foreground">
                                            HMAC-SHA256 (Base64) in <DocsInlineCode>signature</DocsInlineCode> using{" "}
                                            <DocsInlineCode>ApiSecretKey</DocsInlineCode>
                                        </span>,
                                    ],
                                    [
                                        <span className="font-semibold">Callback notifications</span>,
                                        <span className="text-muted-foreground">
                                            Your callbackurl; confirm with GetTransactionStatus before releasing goods
                                        </span>,
                                    ],
                                ]}
                            />
                        </div>

                        <div id="delivery-behaviour" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Delivery behaviour</h3>
                            <DocsTable
                                headers={["Rule", "Partner action"]}
                                rows={[
                                    [
                                        <span className="font-semibold">Success</span>,
                                        <span className="text-muted-foreground">Return 2xx quickly</span>,
                                    ],
                                    [
                                        <span className="font-semibold">5xx / network</span>,
                                        <span className="text-muted-foreground">MITO retries (up to 5, exponential backoff)</span>,
                                    ],
                                    [
                                        <span className="font-semibold">4xx</span>,
                                        <span className="text-muted-foreground">Not retried — fix endpoint</span>,
                                    ],
                                    [
                                        <span className="font-semibold">Idempotency</span>,
                                        <span className="text-muted-foreground">
                                            Deduplicate with <DocsInlineCode>eventId</DocsInlineCode> (outbound) or partner +
                                            reference (callbacks)
                                        </span>,
                                    ],
                                ]}
                            />
                        </div>

                        <div id="webhooks" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Where to configure</h3>
                            <DocsTable
                                headers={["Partner", "Channel", "Field"]}
                                rows={[
                                    [
                                        <span className="font-semibold">Retail</span>,
                                        <span className="text-muted-foreground">Outbound webhook</span>,
                                        <span className="text-muted-foreground">
                                            <DocsInlineCode>webhookUrl</DocsInlineCode> on create transaction
                                        </span>,
                                    ],
                                    [
                                        <span className="font-semibold">MTO</span>,
                                        <span className="text-muted-foreground">Outbound webhook</span>,
                                        <span className="text-muted-foreground">Affiliate push URL for payout_*</span>,
                                    ],
                                    [
                                        <span className="font-semibold">Biller</span>,
                                        <span className="text-muted-foreground">Callback notification</span>,
                                        <span className="text-muted-foreground">
                                            <DocsInlineCode>callbackurl</DocsInlineCode> on InitiateTransactions
                                        </span>,
                                    ],
                                ]}
                            />
                        </div>
                    </div>
                </section>

                <section id="outbound-webhooks" className="space-y-8 scroll-mt-24 border-t pt-12">
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold">Outbound webhooks — eventType catalog</h2>
                        <p className="text-muted-foreground">
                            Retail and MTO receive a signed envelope. Branch your handler on{" "}
                            <DocsInlineCode>eventType</DocsInlineCode>. Wire strings below are exactly what MITO sends.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Payload fields & verification:{" "}
                            <Link
                                href="/developers/api-reference/retail-api#webhook-notification"
                                className="text-primary font-semibold hover:underline"
                            >
                                Retail API · Webhook notification
                            </Link>
                        </p>
                    </div>

                    {outboundEvents.map((section) => (
                        <div key={section.id} id={section.id} className="space-y-3 scroll-mt-24">
                            <h3 className="text-lg font-semibold">{section.group}</h3>
                            <DocsTable
                                headers={["eventType", "When", "Typical partner"]}
                                rows={section.events.map((e) => [
                                    <span key={e.type} className="font-mono text-xs text-primary">
                                        {e.type}
                                    </span>,
                                    <span key={`${e.type}-w`} className="text-muted-foreground">
                                        {e.when}
                                    </span>,
                                    <span key={`${e.type}-p`} className="text-muted-foreground">
                                        {e.partners}
                                    </span>,
                                ])}
                            />
                        </div>
                    ))}
                </section>

                <section id="callback-notifications" className="space-y-8 scroll-mt-24 border-t pt-12">
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold">Callback notifications — NotificationType catalog</h2>
                        <p className="text-muted-foreground">
                            Biller integrations receive <DocsInlineCode>NotificationType</DocsInlineCode> +{" "}
                            <DocsInlineCode>Body</DocsInlineCode> on your <DocsInlineCode>callbackurl</DocsInlineCode>.
                            Handle every type you expect for your payment modes; always confirm with status APIs before
                            releasing goods.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Initiate / status APIs:{" "}
                            <Link
                                href="/developers/api-reference/biller-api"
                                className="text-primary font-semibold hover:underline"
                            >
                                Biller API reference
                            </Link>
                        </p>
                    </div>

                    {callbackNotifications.map((section) => (
                        <div key={section.id} id={section.id} className="space-y-3 scroll-mt-24">
                            <h3 className="text-lg font-semibold">{section.group}</h3>
                            <DocsTable
                                headers={["NotificationType", "When"]}
                                rows={section.events.map((e) => [
                                    <span key={e.type} className="font-mono text-xs text-primary">
                                        {e.type}
                                    </span>,
                                    <span key={`${e.type}-w`} className="text-muted-foreground">
                                        {e.when}
                                    </span>,
                                ])}
                            />
                        </div>
                    ))}
                </section>

                <GuideRelatedHelpers
                    items={[
                        {
                            href: "/developers/api-reference/retail-api#webhook-notification",
                            title: "Retail webhook payload",
                            description: "Envelope JSON & fields",
                        },
                        {
                            href: "/developers/api-reference/manage#webhook-verification",
                            title: "Signature verification",
                            description: "HMAC sample code",
                        },
                        {
                            href: "/developers/guides/retail#webhooks",
                            title: "Retail guide",
                            description: "Core Retail eventTypes",
                        },
                        {
                            href: "/developers/guides/biller#webhooks",
                            title: "Biller guide",
                            description: "Callback setup",
                        },
                        {
                            href: "/developers/guides/mto#webhooks",
                            title: "MTO guide",
                            description: "payout_* events",
                        },
                        { href: "/developers/settlement", title: "Settlement", description: "When funds are final" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
