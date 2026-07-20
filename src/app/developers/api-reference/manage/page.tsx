"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { DocsPage, DocsPageHeader, DocsInlineCode } from "@/components/developers/DocsPage";
import { CodeBlock } from "@/components/developers/CodeBlocks";
import Link from "next/link";
import { PARTNER_API_PAGES } from "@/lib/api-endpoints";

const signatureCheckCode = `const crypto = require('crypto');

// Outbound webhook body includes: eventId, eventType, timestamp, data, signature
const body = req.body;
const apiSecretKey = process.env.MITO_API_SECRET_KEY;

// Recompute HMAC-SHA256 over the same payload object MITO signed, Base64 digest
const signedPayload = JSON.stringify({
  eventId: body.eventId,
  eventType: body.eventType,
  timestamp: body.timestamp,
  data: body.data,
});
const expected = crypto
  .createHmac('sha256', apiSecretKey)
  .update(signedPayload)
  .digest('base64');

if (body.signature === expected) {
  res.status(200).send('OK');
} else {
  res.status(401).send('Invalid signature');
}`;

export default function ManageApiPage() {
    return (
        <DocsLayout>
            <DocsPage>
                <DocsPageHeader
                    eyebrow="API Reference · Manage"
                    title="Manage"
                    description="Cross-cutting verification helpers. Auth, balances, and status live on each partner API page."
                />

                <section id="webhook-verification" className="scroll-mt-24 space-y-4">
                    <h2 className="text-xl font-bold">Webhook signature verification</h2>
                    <p className="text-muted-foreground text-sm">
                        Outbound webhooks (Retail + MTO payouts) include an HMAC-SHA256 digest as Base64 in the JSON{" "}
                        <DocsInlineCode>signature</DocsInlineCode> field, using your{" "}
                        <DocsInlineCode>ApiSecretKey</DocsInlineCode>. Deduplicate with{" "}
                        <DocsInlineCode>eventId</DocsInlineCode>. Biller uses separate callback{" "}
                        <DocsInlineCode>Notification</DocsInlineCode> POSTs — see{" "}
                        <Link href="/developers/webhooks" className="text-primary font-semibold hover:underline">
                            Webhooks & notifications
                        </Link>
                        . Envelope fields:{" "}
                        <Link
                            href="/developers/api-reference/retail-api#webhook-notification"
                            className="text-primary font-semibold hover:underline"
                        >
                            Retail API · Webhook notification
                        </Link>
                        .
                    </p>
                    <CodeBlock code={signatureCheckCode} language="javascript" />
                </section>

                <section className="border-t pt-8 space-y-3">
                    <h2 className="text-xl font-bold">Partner API references</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {Object.values(PARTNER_API_PAGES).map((p) => (
                            <li key={p.href}>
                                <Link href={p.href} className="text-primary font-semibold hover:underline">
                                    {p.title}
                                </Link>
                                {" · "}
                                <a href={p.external} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                    Redoc
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </DocsPage>
        </DocsLayout>
    );
}
