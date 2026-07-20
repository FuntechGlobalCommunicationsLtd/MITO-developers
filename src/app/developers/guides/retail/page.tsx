"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";
import { ApiEntryList, type GuideApiEntry } from "@/components/developers/IntegrationGuide";
import { DocsPage, DocsPageHeader } from "@/components/developers/DocsPage";
import { ArrowRight } from "lucide-react";

const RETAIL_WORKFLOW_APIS: GuideApiEntry[] = [
    { method: "POST", path: "/api/v1/mito/Auth/login", title: "Authenticate (JWT)", href: "/developers/api-reference/retail-api#auth-login" },
    { method: "GET", path: "/api/v1/mito/Exchange/corridors", title: "Get corridors", href: "/developers/api-reference/retail-api#get-corridors" },
    { method: "POST", path: "/api/v1/mito/Exchange/rates", title: "Validate exchange rate", href: "/developers/api-reference/retail-api#post-rates" },
    { method: "POST", path: "/api/v1/mito/Beneficiaries", title: "Create beneficiary", href: "/developers/api-reference/retail-api#create-beneficiary" },
    { method: "POST", path: "/api/v1/mito/Transactions", title: "Initiate transaction", href: "/developers/api-reference/retail-api#create-transaction" },
    { method: "GET", path: "/api/v1/mito/Transactions/by-reference", title: "Get transaction status", href: "/developers/api-reference/retail-api#get-transaction" },
];

const RETAIL_HELPER_APIS: GuideApiEntry[] = [
    { method: "POST", path: "/api/v1/mito/Users", title: "Create user (sender)", href: "/developers/api-reference/retail-api#create-user" },
    { method: "GET", path: "/api/v1/mito/Lookups/provider", title: "Get payout providers", href: "/developers/api-reference/retail-api#get-lookup-provider" },
    { method: "GET", path: "/api/v1/mito/Beneficiaries/requirements", title: "Beneficiary requirements", href: "/developers/api-reference/retail-api#get-beneficiary-requirements" },
];

export default function RetailAffiliateGuidePage() {
    return (
        <DocsLayout>
            <DocsPage>
                {/* ─── OVERVIEW ─── */}
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Integration methods · Retail"
                        title="Retail partner integration"
                        description="Partner-facing contract for C2C remittance: authenticate, quote, create a transaction, launch checkout, receive callbacks, and confirm final status."
                    />

                    {/* 1. Introduction */}
                    <div id="introduction" className="space-y-4 scroll-mt-24">
                        <h2 className="text-xl font-bold">Introduction</h2>
                        <p className="text-muted-foreground">
                            Retail partners resell MITO remittance to end customers. You own the customer relationship and choose how much of the
                            checkout UI you build. MITO provides the transaction APIs, hosted checkout options, signed webhooks, and status APIs.
                        </p>
                        <p className="text-muted-foreground">
                            This guide answers: which integration option to pick, which APIs to call and in what order, what responses to expect,
                            and which webhook events to handle. Endpoint request/response schemas live in the{" "}
                            <Link href="/developers/api-reference/retail-api" className="text-primary font-semibold hover:underline">
                                Retail API reference
                            </Link>
                            .
                        </p>
                        <div className="rounded-xl border p-5 bg-muted/20 space-y-3">
                            <h3 className="font-semibold text-sm">What this documentation covers</h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Overall partner workflow and integration options</li>
                                <li>Authentication and webhooks</li>
                                <li>Per-option workflow diagrams, API sequences, and responsibilities</li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. Overall workflow */}
                    <div id="overall-workflow" className="space-y-4 scroll-mt-24">
                        <h2 className="text-xl font-bold">Overall workflow</h2>
                        <p className="text-muted-foreground">
                            Every Retail option follows the same contract shape. Checkout UI differs; APIs and webhooks do not.
                        </p>
                        <FlowDiagram title="Retail partner contract">
                            <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-4">
                                <FlowNode label="Authenticate" sublabel="POST .../mito/Auth/login" type="user" />
                                <FlowArrow direction="right" label="JWT" />
                                <FlowNode label="Quote" sublabel="Corridors + rates" type="secondary" />
                                <FlowArrow direction="right" label="rateId" />
                                <FlowNode label="Create txn" sublabel="POST .../mito/Transactions" type="MITO" />
                                <FlowArrow direction="right" label="Checkout" />
                                <FlowNode label="Webhooks" sublabel="Status updates" type="primary" />
                            </div>
                        </FlowDiagram>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                            <li>Authenticate and obtain a JWT.</li>
                            <li>Quote the corridor (corridors + rates) and capture <code className="bg-muted px-1 rounded">rateId</code>.</li>
                            <li>Create the transaction server-side; receive <code className="bg-muted px-1 rounded">linkToken</code> and/or <code className="bg-muted px-1 rounded">paymentUrl</code>.</li>
                            <li>Customer completes checkout (SDK, redirect, or hybrid).</li>
                            <li>Confirm final outcome from webhooks; use status APIs for reconciliation.</li>
                        </ol>
                    </div>

                    {/* 3. Integration options */}
                    <div id="integration-options" className="space-y-4 scroll-mt-24">
                        <h2 className="text-xl font-bold">Integration options</h2>
                        <p className="text-muted-foreground">
                            Pick one model below. Each detail section uses the same four parts: Overview, Workflow Diagram, API Sequence, Notes &amp; Responsibilities.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                {
                                    href: "#retail-widget",
                                    title: "Widget (SDK)",
                                    description: "Embed MITO Link in Web or React Native using linkToken.",
                                },
                                {
                                    href: "#retail-hosted-pages",
                                    title: "Hosted Pages",
                                    description: "Redirect the customer to MITO paymentUrl.",
                                },
                                {
                                    href: "#retail-hosted-hybrid",
                                    title: "Hosted Checkout (Hybrid)",
                                    description: "Your pre-checkout UI + MITO-hosted payment journey.",
                                },
                                {
                                    href: "#retail-full-api",
                                    title: "Full API Integration",
                                    description: "Full backend orchestration; MITO as status/webhook authority.",
                                },
                            ].map((opt) => (
                                <Link
                                    key={opt.href}
                                    href={opt.href}
                                    className="p-4 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                                >
                                    <p className="font-semibold text-sm group-hover:text-primary flex items-center gap-1">
                                        {opt.title}
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                                </Link>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Shared prerequisites: Retail credentials, enabled corridors, HTTPS webhook URL, and a unique{" "}
                            <code className="bg-muted px-1 rounded">PartnerReferenceNumber</code> per transfer.
                        </p>
                    </div>

                    {/* 4. API contract (shared across options) */}
                    <div id="api-contract" className="space-y-6 scroll-mt-24">
                        <div>
                            <h2 className="text-xl font-bold">API contract</h2>
                            <p className="text-muted-foreground mt-2">
                                Shared integration rules below. Error handling, idempotency, statuses, and request/response schemas:{" "}
                                <Link href="/developers/api-reference/retail-api" className="text-primary font-semibold hover:underline">
                                    Retail API reference
                                </Link>
                                .
                            </p>
                        </div>

                        {/* Authentication — JWT */}
                        <div id="authentication" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Authentication (JWT)</h3>
                            <p className="text-muted-foreground">
                                Retail uses JWT Bearer authentication. Call login to get a token, then send{" "}
                                <code className="bg-muted px-1.5 py-0.5 rounded">Authorization: Bearer &lt;jwt&gt;</code> on API calls.
                                Transaction create also requires <code className="bg-muted px-1.5 py-0.5 rounded">Mito-Secret-Key</code> server-side.
                            </p>
                            <div className="overflow-x-auto rounded-xl border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground border-b">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Header</th>
                                            <th className="px-4 py-3 font-medium">Value</th>
                                            <th className="px-4 py-3 font-medium">Where to use</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary">Authorization</td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                <code className="bg-muted px-1.5 py-0.5 rounded">Bearer &lt;jwt&gt;</code> from{" "}
                                                <code className="bg-muted px-1.5 py-0.5 rounded">POST /api/v1/mito/Auth/login</code>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">All Retail API calls</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary">Mito-Secret-Key</td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                Partner secret key (<code className="bg-muted px-1.5 py-0.5 rounded">sk_...</code>)
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                Server-side only — required on <code className="bg-muted px-1.5 py-0.5 rounded">POST /api/v1/mito/Transactions</code>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary">Content-Type</td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                <code className="bg-muted px-1.5 py-0.5 rounded">application/json</code>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">POST / PUT / PATCH</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div className="rounded-lg border p-4">
                                    <p className="font-semibold text-sm mb-1">Publishable key</p>
                                    <p className="text-xs text-muted-foreground">
                                        <code className="bg-muted px-1 rounded">pk_...</code> — safe in browser / mobile app for SDK{" "}
                                        <code className="bg-muted px-1 rounded">publishableKey</code>.
                                    </p>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <p className="font-semibold text-sm mb-1">Secret key</p>
                                    <p className="text-xs text-muted-foreground">
                                        <code className="bg-muted px-1 rounded">sk_...</code> — never commit or ship in client code. Rotate if exposed.
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Credential values for sandbox/live:{" "}
                                <Link href="/developers/get-started#environments" className="text-primary font-semibold hover:underline">
                                    Getting Started · Environments
                                </Link>
                                {" · "}
                                <Link href="/developers/api-reference/retail-api#auth" className="text-primary font-semibold hover:underline">
                                    Retail API Authentication
                                </Link>
                            </p>
                        </div>

                        {/* Webhooks */}
                        <div id="webhooks" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Webhooks</h3>
                            <p className="text-muted-foreground">
                                Pass <code className="bg-muted px-1.5 py-0.5 rounded">webhookUrl</code> on{" "}
                                <code className="bg-muted px-1.5 py-0.5 rounded">POST /api/v1/mito/Transactions</code>. MITO POSTs signed events there.
                                Redirect / SDK <code className="bg-muted px-1.5 py-0.5 rounded">onSuccess</code> is for UX only — confirm final state from webhooks (or status API).
                            </p>
                            <div className="overflow-x-auto rounded-xl border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground border-b">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">eventType</th>
                                            <th className="px-4 py-3 font-medium">When (partner-facing)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary text-xs">transaction_initiated</td>
                                            <td className="px-4 py-3 text-muted-foreground">Transaction created via POST /api/v1/mito/Transactions</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary text-xs">payment_collected</td>
                                            <td className="px-4 py-3 text-muted-foreground">Customer payment received (partner-payout mode)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary text-xs">awaiting_confirmation</td>
                                            <td className="px-4 py-3 text-muted-foreground">Funds held — partner confirms after their payout</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary text-xs">transaction_completed</td>
                                            <td className="px-4 py-3 text-muted-foreground">Terminal success</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-primary text-xs">transaction_failed</td>
                                            <td className="px-4 py-3 text-muted-foreground">Terminal failure</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Deduplicate with <code className="bg-muted px-1 rounded">eventId</code>.</li>
                                <li>Match transactions with <code className="bg-muted px-1 rounded">data.partnerRef</code> and <code className="bg-muted px-1 rounded">data.transactionRef</code>.</li>
                                <li>
                                    Delivery details:{" "}
                                    <Link href="/developers/webhooks" className="text-primary font-semibold hover:underline">
                                        Webhooks
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </section>

                <section id="retail-widget" className="space-y-6">
                    <h2 className="text-xl font-bold">1) Widget (SDK)</h2>

                    <div id="retail-widget-overview" className="space-y-2">
                        <h3 className="text-lg font-semibold">Overview</h3>
                        <p className="text-sm text-muted-foreground">
                            Use this when you want an embedded checkout in Web/React/React Native while MITO hosts payment and journey UI.
                            Your backend creates the transaction and returns <code>linkToken</code>; your frontend launches MITO Link.
                        </p>
                    </div>

                    <div id="retail-widget-diagram">
                        <h3 className="text-lg font-semibold mb-3">Workflow Diagram</h3>
                        <FlowDiagram title="Retail SDK flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Partner backend" sublabel="POST transaction" type="user" />
                                <FlowArrow direction="right" label="linkToken" />
                                <FlowNode label="Partner frontend" sublabel="useMitoLink" type="secondary" />
                                <FlowArrow direction="right" label="Open SDK" />
                                <FlowNode label="MITO Link" sublabel="Payment + journey" type="MITO" />
                            </div>
                        </FlowDiagram>
                    </div>

                    <div id="retail-widget-sequence" className="space-y-2">
                        <h3 className="text-lg font-semibold">API Sequence</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                            <li><code>POST /api/v1/mito/Transactions</code> with JWT + <code>Mito-Secret-Key</code> to create transaction and receive <code>linkToken</code>.</li>
                            <li>Frontend starts SDK with <code>linkType=retail-payment</code>, <code>publishableKey</code>, and <code>environment</code>.</li>
                            <li>Receive webhook events (<code>transaction_initiated</code>, then outcome events) on your <code>webhookUrl</code>.</li>
                            <li><code>GET /api/v1/mito/Transactions</code> or <code>GET /api/v1/mito/Transactions/by-reference</code> for reconciliation/status polling when needed.</li>
                        </ol>
                    </div>

                    <div id="retail-widget-notes" className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">Partner responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Create transactions server-side only; never expose secret key.</li>
                                <li>Use webhook events as source of truth for final status.</li>
                                <li>Handle duplicate webhooks using <code>eventId</code> idempotency.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">MITO responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Provide secure checkout runtime and signed webhook delivery.</li>
                                <li>Emit transaction lifecycle events until terminal state.</li>
                                <li>Return <code>linkToken</code> and <code>paymentUrl</code> in transaction response.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="retail-hosted-pages" className="space-y-6">
                    <h2 className="text-xl font-bold">2) Hosted Pages</h2>

                    <div id="retail-hosted-pages-overview" className="space-y-2">
                        <h3 className="text-lg font-semibold">Overview</h3>
                        <p className="text-sm text-muted-foreground">
                            Use this when you prefer redirect-based checkout. Your backend creates a transaction and redirects the user
                            to MITO <code>paymentUrl</code>. MITO redirects back to your <code>redirectUrl</code> after checkout.
                        </p>
                    </div>

                    <div id="retail-hosted-pages-diagram">
                        <h3 className="text-lg font-semibold mb-3">Workflow Diagram</h3>
                        <FlowDiagram title="Retail hosted pages flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Partner backend" sublabel="Create transaction" type="user" />
                                <FlowArrow direction="right" label="paymentUrl" />
                                <FlowNode label="Customer browser" sublabel="Redirect" type="secondary" />
                                <FlowArrow direction="right" label="Checkout" />
                                <FlowNode label="MITO Hosted Page" sublabel="Journey + payment" type="MITO" />
                            </div>
                        </FlowDiagram>
                    </div>

                    <div id="retail-hosted-pages-sequence" className="space-y-2">
                        <h3 className="text-lg font-semibold">API Sequence</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                            <li><code>POST /api/v1/mito/Exchange/rates</code> to get a valid <code>rateId</code>.</li>
                            <li><code>POST /api/v1/mito/Transactions</code> with <code>redirectUrl</code> and <code>webhookUrl</code>.</li>
                            <li>Redirect customer to returned <code>paymentUrl</code>.</li>
                            <li>Receive final state by webhook; treat redirect query params as UX-only hints.</li>
                        </ol>
                    </div>

                    <div id="retail-hosted-pages-notes" className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">Partner responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Persist partner reference and MITO reference for reconciliation.</li>
                                <li>Use HTTPS public webhook URL and verify signature.</li>
                                <li>Do not fulfill transfer from redirect result alone.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">MITO responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Host checkout journey and payment UI.</li>
                                <li>Return to partner redirect URL after customer action.</li>
                                <li>Send lifecycle updates to configured webhook endpoint.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="retail-hosted-hybrid" className="space-y-6">
                    <h2 className="text-xl font-bold">3) Hosted Checkout (Hybrid)</h2>

                    <div id="retail-hosted-hybrid-overview" className="space-y-2">
                        <h3 className="text-lg font-semibold">Overview</h3>
                        <p className="text-sm text-muted-foreground">
                            Use this when you want your own pre-checkout UI but MITO-hosted checkout execution.
                            Partner collects sender/order context, then MITO handles payment journey from transaction creation.
                        </p>
                    </div>

                    <div id="retail-hosted-hybrid-diagram">
                        <h3 className="text-lg font-semibold mb-3">Workflow Diagram</h3>
                        <FlowDiagram title="Retail hybrid flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Partner UI" sublabel="Collect sender/order" type="user" />
                                <FlowArrow direction="right" label="Server call" />
                                <FlowNode label="Partner backend" sublabel="Create transaction" type="secondary" />
                                <FlowArrow direction="right" label="paymentUrl / linkToken" />
                                <FlowNode label="MITO checkout" sublabel="Hosted execution" type="MITO" />
                            </div>
                        </FlowDiagram>
                    </div>

                    <div id="retail-hosted-hybrid-sequence" className="space-y-2">
                        <h3 className="text-lg font-semibold">API Sequence</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                            <li><code>GET /api/v1/mito/Exchange/corridors</code> and <code>POST /api/v1/mito/Exchange/rates</code> to quote customer.</li>
                            <li>Optional: <code>POST /api/v1/mito/Beneficiaries</code> before transaction to skip beneficiary input in hosted page.</li>
                            <li><code>POST /api/v1/mito/Transactions</code> and choose SDK launch (<code>linkToken</code>) or redirect (<code>paymentUrl</code>).</li>
                            <li>Consume webhook callbacks and reconcile via transaction status APIs.</li>
                        </ol>
                    </div>

                    <div id="retail-hosted-hybrid-notes" className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">Partner responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Own pre-checkout journey, pricing display, and customer communication.</li>
                                <li>Use one idempotency key per create attempt.</li>
                                <li>Store both <code>partnerReferenceNumber</code> and MITO <code>reference</code>.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">MITO responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Execute hosted payment/checkout journey securely.</li>
                                <li>Maintain transaction lifecycle and webhook notifications.</li>
                                <li>Provide consistent status visibility through webhook and APIs.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="retail-full-api" className="space-y-6">
                    <h2 className="text-xl font-bold">4) Full API Integration</h2>

                    <div id="retail-full-api-overview" className="space-y-2">
                        <h3 className="text-lg font-semibold">Overview</h3>
                        <p className="text-sm text-muted-foreground">
                            Use this when you want full backend orchestration and maximum control over your customer experience.
                            MITO remains the transaction platform and status/webhook authority.
                        </p>
                    </div>

                    <div id="retail-full-api-diagram">
                        <h3 className="text-lg font-semibold mb-3">Workflow Diagram</h3>
                        <FlowDiagram title="Retail full API flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Partner backend" sublabel="API orchestration" type="user" />
                                <FlowArrow direction="right" label="REST APIs" />
                                <FlowNode label="MITO APIs" sublabel="Rates, transaction, status" type="MITO" />
                                <FlowArrow direction="right" label="Webhook events" />
                                <FlowNode label="Partner webhook" sublabel="Final confirmation" type="secondary" />
                            </div>
                        </FlowDiagram>
                    </div>

                    <div id="retail-full-api-sequence" className="space-y-2">
                        <h3 className="text-lg font-semibold">API Sequence</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                            <li><code>POST /api/v1/mito/Auth/login</code> authenticate and store token.</li>
                            <li><code>GET /api/v1/mito/Exchange/corridors</code> get supported country pairs.</li>
                            <li><code>POST /api/v1/mito/Exchange/rates</code> get quote and <code>rateId</code>.</li>
                            <li><code>GET /api/v1/mito/Beneficiaries/requirements</code> read required payout fields.</li>
                            <li><code>POST /api/v1/mito/Beneficiaries</code> create beneficiary (or pass <code>beneficiaryId</code>).</li>
                            <li><code>POST /api/v1/mito/Transactions</code> create retail transaction.</li>
                            <li>Receive webhook status updates and reconcile with <code>GET /api/v1/mito/Transactions/by-reference</code>.</li>
                        </ol>
                        <p className="text-sm text-muted-foreground">
                            Full endpoint definitions are in{" "}
                            <Link href="/developers/api-reference/retail-api" className="text-primary font-medium hover:underline">
                                Retail API reference
                            </Link>
                            .
                        </p>
                    </div>

                    <div id="retail-full-api-notes" className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">Partner responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Implement retries and idempotency for create operations.</li>
                                <li>Treat webhooks as asynchronous source of truth for completion.</li>
                                <li>Implement reconciliation jobs using transaction and reporting APIs.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">MITO responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                <li>Provide stable API contract and webhook delivery policy.</li>
                                <li>Return status transitions and terminal outcomes.</li>
                                <li>Expose transaction and payout details for partner reporting.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ─── APIs involved ─── */}
                <section id="apis-involved" className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-2">APIs involved</h2>
                        <p className="text-sm text-muted-foreground">
                            Click an endpoint to open its full request/response spec in the{" "}
                            <Link href="/developers/api-reference/retail-api" className="text-primary font-semibold hover:underline">
                                Retail API reference
                            </Link>
                            .
                        </p>
                    </div>

                    <div id="apis-workflow" className="space-y-3">
                        <div>
                            <h3 className="text-lg font-bold">Workflow APIs</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                JWT auth first, then quote → beneficiary → create → status.
                            </p>
                        </div>
                        <ApiEntryList apis={RETAIL_WORKFLOW_APIS} />
                    </div>

                    <div id="apis-helper" className="space-y-3">
                        <div>
                            <h3 className="text-lg font-bold">Helper APIs</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Sender setup, provider lookup, and field requirements.
                            </p>
                        </div>
                        <ApiEntryList apis={RETAIL_HELPER_APIS} />
                    </div>
                </section>
            </DocsPage>
        </DocsLayout>
    );
}
