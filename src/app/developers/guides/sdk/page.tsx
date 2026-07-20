"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";

export default function SDKIntegrationGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "SDK & widget integration",
                    partnerLabel: "Retail · SDK",
                    description:
                        "Embed MITO checkout in your web or mobile app via the Link SDK. Retail only — your backend creates a transaction; the SDK handles payment UI, 3DS, and KYC collection.",
                    prerequisites: [
                        "Retail credentials (publishable key for frontend, secret for backend).",
                        "Backend endpoint to create a Retail transaction and return a linkToken to the client.",
                        "Webhook endpoint for final payment confirmation.",
                    ],
                    integrationMethods: [
                        { label: "Retail guide", href: "/developers/guides/retail", description: "Full Retail integration options." },
                        { label: "Retail widget section", href: "/developers/guides/retail#retail-widget", description: "Widget (SDK) in the Retail guide." },
                        { label: "SDK API reference", href: "/developers/api-reference/sdk", description: "Install, config props, and code samples." },
                    ],
                    diagramTitle: "SDK checkout flow",
                    diagram: null,
                    phases: {
                        collect: [
                            {
                                title: "Create transaction (server-side)",
                                description:
                                    "Your backend calls POST /api/v1/mito/Transactions to obtain a linkToken. Never expose secret keys in the frontend.",
                                apiLinks: [
                                    { label: "POST /api/v1/mito/Transactions", href: "/developers/api-reference/retail-api#create-transaction" },
                                ],
                            },
                            {
                                title: "Pass linkToken to client",
                                description: "Return the linkToken from your API to the browser or mobile app securely.",
                            },
                        ],
                        processForex: [
                            {
                                title: "Launch SDK checkout",
                                description:
                                    "Initialize useMitoLink with linkToken, linkType (e.g. retail-payment), and callbacks.",
                                apiLinks: [
                                    { label: "SDK reference — install & usage", href: "/developers/api-reference/sdk" },
                                ],
                            },
                            {
                                title: "Customer completes in modal",
                                description: "SDK handles card capture, 3D Secure, and KYC without a full-page redirect.",
                            },
                        ],
                        disburse: [
                            {
                                title: "Handle onSuccess / onExit",
                                description: "Use SDK callbacks for UX only — always confirm final status via webhook or status API.",
                                webhookLinks: [{ label: "Webhook events", href: "/developers/webhooks" }],
                                apiLinks: [
                                    { label: "Get transaction status", href: "/developers/api-reference/retail-api#get-transaction" },
                                ],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "transaction_completed", href: "/developers/webhooks#outbound-transaction", when: "Retail transfer completed." },
                        { name: "payment_collected", href: "/developers/webhooks#outbound-payment", when: "Retail payment collected." },
                    ],
                    statusFlow: ["pending", "processing", "completed", "failed"],
                    credentialsService: "retail",
                    apisInvolved: [
                        { method: "POST", path: "/api/v1/mito/Transactions", title: "Create transaction (Retail)", href: "/developers/api-reference/retail-api#create-transaction" },
                        { method: "GET", path: "/api/v1/mito/Transactions/by-reference", title: "Transaction status", href: "/developers/api-reference/retail-api#get-transaction" },
                    ],
                }}
            />
        </DocsLayout>
    );
}
