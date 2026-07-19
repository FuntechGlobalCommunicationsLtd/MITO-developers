"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { ApiModelHub } from "@/components/developers/ApiModelHub";
import { endpointsByPhase, PARTNER_API_PAGES } from "@/lib/api-endpoints";
import { CodeBlock } from "@/components/developers/CodeBlocks";

const signatureCheckCode = `const crypto = require('crypto');

const payload = req.rawBody;
const signatureHeader = req.headers['x-mito-signature'];
const webhookSecret = process.env.MITO_WEBHOOK_SECRET;

const expectedSignature = crypto
  .createHmac('sha256', webhookSecret)
  .update(payload)
  .digest('hex');

if (signatureHeader === expectedSignature) {
  res.status(200).send('OK');
} else {
  res.status(401).send('Invalid signature');
}`;

export default function ManageApiPage() {
    const endpoints = endpointsByPhase("manage");

    return (
        <DocsLayout>
            <div className="max-w-4xl space-y-16">
                <ApiModelHub
                    phase="API Reference"
                    title="Manage"
                    description="Index of auth, balances, and status endpoints. Click any row to open the full partner API endpoint page."
                    endpoints={endpoints.map((e) => ({
                        method: e.method,
                        path: e.path,
                        title: e.title,
                        description: e.description,
                        href: e.href,
                    }))}
                    relatedDocs={[
                        { title: "Retail API", href: "/developers/api-reference/retail-api", description: "Full retail endpoint specs" },
                        { title: "Biller API", href: "/developers/api-reference/biller-api", description: "Full Business / payout endpoint specs" },
                        { title: "MTO API", href: "/developers/api-reference/mto-api", description: "Full MTO endpoint specs" },
                        { title: "Webhooks", href: "/developers/webhooks", description: "Event catalog" },
                    ]}
                />

                <section id="webhook-verification" className="scroll-mt-24 border-t pt-12">
                    <h2 className="text-2xl font-bold mb-4">Webhook signature verification</h2>
                    <p className="text-muted-foreground mb-6 text-sm">
                        MTO payout webhooks use HMAC-SHA256 with your <code className="bg-muted px-1 rounded">ApiSecretKey</code>.
                        Events: <code className="bg-muted px-1 rounded">payout_initiated</code>, <code className="bg-muted px-1 rounded">payout_completed</code>, <code className="bg-muted px-1 rounded">payout_failed</code>.
                    </p>
                    <CodeBlock code={signatureCheckCode} language="javascript" />
                </section>

                <section className="border-t pt-8 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground mb-2">Full partner references</p>
                    <ul className="space-y-1">
                        {Object.values(PARTNER_API_PAGES).map((p) => (
                            <li key={p.href}>
                                <a href={p.href} className="text-primary hover:underline">{p.title}</a>
                                {" · "}
                                <a href={p.external} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Redoc</a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </DocsLayout>
    );
}
