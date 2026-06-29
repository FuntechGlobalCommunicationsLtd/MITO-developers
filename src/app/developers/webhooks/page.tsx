"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { WebhookEventCard } from "@/components/developers/WebhookEventCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const eventGroups = [
    {
        phase: "Collect",
        events: [
            {
                event: "PAYMENT_CAPTURED",
                description: "Biller collection payment captured. Confirm before releasing goods.",
                usedIn: [{ label: "Biller", href: "/developers/guides/biller" }],
                payload: `{ "type": "PAYMENT_CAPTURED", "data": { "transactionRef": "INV-001", "status": "captured" } }`,
            },
            {
                event: "collection.completed",
                description: "Customer successfully paid a collection request.",
                usedIn: [{ label: "Retail", href: "/developers/guides/retail" }],
                payload: `{ "type": "collection.completed", "data": { "collection_id": "col_987", "amount": 50000, "currency": "KES" } }`,
            },
        ],
    },
    {
        phase: "Process / Forex",
        events: [
            {
                event: "transfer.processing",
                description: "Transfer accepted and being processed through FX and compliance.",
                usedIn: [{ label: "MTO", href: "/developers/guides/mto" }, { label: "Retail", href: "/developers/guides/retail" }],
                payload: `{ "type": "transfer.processing", "data": { "transfer_id": "trf_123", "status": "processing" } }`,
            },
            {
                event: "compliance.case.approved",
                description: "Sender KYC submission approved.",
                usedIn: [{ label: "Retail", href: "/developers/guides/retail" }],
                payload: `{ "type": "compliance.case.approved", "data": { "individual_id": "ind_555", "status": "approved" } }`,
            },
        ],
    },
    {
        phase: "Disburse",
        events: [
            {
                event: "payout_initiated",
                description: "MTO: settlement debited, payout transaction created (mtoforex outbound webhook).",
                usedIn: [{ label: "MTO", href: "/developers/guides/mto" }],
                payload: `{ "eventType": "payout_initiated", "data": { "transactionRef": "100012345", "payoutId": "...", "status": "INREVIEW" } }`,
            },
            {
                event: "payout_completed",
                description: "MTO: payout reached successful terminal status (e.g. COMPSUCCESS).",
                usedIn: [{ label: "MTO", href: "/developers/guides/mto" }],
                payload: `{ "eventType": "payout_completed", "data": { "transactionRef": "100012345", "status": "COMPSUCCESS" } }`,
            },
            {
                event: "payout_failed",
                description: "MTO: payout failed (e.g. COMPFAILED, UNRESOLVED).",
                usedIn: [{ label: "MTO", href: "/developers/guides/mto" }],
                payload: `{ "eventType": "payout_failed", "data": { "transactionRef": "100012345", "status": "COMPFAILED" } }`,
            },
            {
                event: "transfer.completed",
                description: "Funds reached the beneficiary bank account or mobile wallet.",
                usedIn: [{ label: "MTO", href: "/developers/guides/mto" }, { label: "Retail", href: "/developers/guides/retail" }],
                payload: `{ "type": "transfer.completed", "data": { "transfer_id": "trf_123", "status": "completed" } }`,
            },
            {
                event: "transfer.failed",
                description: "Transfer permanently rejected by the payout network.",
                usedIn: [{ label: "MTO", href: "/developers/guides/mto" }, { label: "Retail", href: "/developers/guides/retail" }],
                payload: `{ "type": "transfer.failed", "data": { "transfer_id": "trf_456", "failure_reason": "account_closed" } }`,
            },
        ],
    },
];

export default function WebhooksPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Platform</p>
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Webhooks</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Receive async notifications when transaction status changes. Always confirm server-side before giving value.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Core behaviour</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="border rounded-xl p-5">
                            <h3 className="font-semibold mb-2">Delivery & retries</h3>
                            <p className="text-sm text-muted-foreground">
                                Return <code className="bg-muted px-1 rounded">2xx</code> within 5 seconds. MITO retries up to 5 times with exponential backoff over 24 hours on timeout or <code className="bg-muted px-1 rounded">5xx</code>.
                            </p>
                        </div>
                        <div className="border rounded-xl p-5">
                            <h3 className="font-semibold mb-2">Idempotency</h3>
                            <p className="text-sm text-muted-foreground">
                                Use <code className="bg-muted px-1 rounded">event_id</code> to deduplicate. Network issues can cause duplicate deliveries.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-12 scroll-mt-24" id="security">
                    <h2 className="text-2xl font-bold mb-4">Signature verification</h2>
                    <p className="text-muted-foreground mb-4">
                        Verify the HMAC in the <code className="bg-muted px-1 rounded font-mono">X-Mito-Signature</code> header using your webhook secret.
                    </p>
                    <Link
                        href="/developers/api-reference/manage#webhook-verification"
                        className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                    >
                        Verification code samples in API Reference <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>

                <section className="mb-12 scroll-mt-24" id="events">
                    <h2 className="text-2xl font-bold mb-6">Events by phase</h2>
                    {eventGroups.map((group) => (
                        <div key={group.phase} className="mb-10">
                            <h3 className="text-lg font-bold mb-4 text-foreground/90 border-b pb-2">{group.phase}</h3>
                            {group.events.map((ev) => (
                                <div key={ev.event} className="mb-6">
                                    <WebhookEventCard event={ev.event} description={ev.description} payload={ev.payload} />
                                    <div className="flex flex-wrap gap-2 mt-2 ml-1">
                                        <span className="text-xs text-muted-foreground">Used in:</span>
                                        {ev.usedIn.map((flow) => (
                                            <Link
                                                key={flow.href}
                                                href={flow.href}
                                                className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary"
                                            >
                                                {flow.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>
            </div>
        </DocsLayout>
    );
}
