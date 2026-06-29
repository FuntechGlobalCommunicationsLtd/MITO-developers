"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";

export default function SDKIntegrationGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "SDK & widget integration",
                    partnerLabel: "Integration method · SDK",
                    description:
                        "Embed MITO checkout in your web or mobile app via the Link SDK. Your backend creates a session; the SDK handles payment UI, 3DS, and KYC collection.",
                    prerequisites: [
                        "Partner credentials (publishable key for frontend, secret for backend).",
                        "Backend endpoint to create a transaction and return a linkToken to the client.",
                        "Webhook endpoint for final payment confirmation.",
                    ],
                    integrationMethods: [
                        { label: "Retail flow", href: "/developers/guides/retail", description: "C2C remittance use case." },
                        { label: "Biller flow", href: "/developers/guides/biller", description: "Bill payment use case." },
                        { label: "SDK API reference", href: "/developers/api-reference/sdk", description: "Install, config props, and code samples." },
                    ],
                    diagramTitle: "SDK checkout flow",
                    diagram: null,
                    phases: {
                        collect: [
                            {
                                title: "Create transaction (server-side)",
                                description:
                                    "Your backend calls the transaction API to obtain a linkToken. Never expose secret keys in the frontend.",
                                apiLinks: [
                                    { label: "POST /transactions — API Reference", href: "/developers/api-reference/retail-api#transactions" },
                                    { label: "Biller: InitiateTransactions", href: "/developers/api-reference/biller-api#api-v2-Business-InitiateTransactions" },
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
                                    "Initialize useMitoLink with linkToken, linkType (bill-payment, retail-payment, or retail-collection), and callbacks.",
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
                                    { label: "Get transaction status", href: "/developers/api-reference/retail-api#transactions-{transactionId}" },
                                ],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "transfer.completed", href: "/developers/webhooks", when: "Retail transfer completed." },
                        { name: "PAYMENT_CAPTURED", href: "/developers/webhooks", when: "Biller payment captured." },
                    ],
                    statusFlow: ["pending", "processing", "completed", "failed"],
                    credentialsService: "retail",
                    apisInvolved: [
                        { method: "POST", path: "/transactions", title: "Create transaction (retail)", href: "/developers/api-reference/collect#transactions" },
                        { method: "POST", path: "/api/v2/Business/InitiateTransactions", title: "Initiate collection (biller)", href: "/developers/api-reference/collect#api-v2-Business-InitiateTransactions" },
                        { method: "GET", path: "/transactions/{id}", title: "Transaction status", href: "/developers/api-reference/manage#transactions-{transactionId}" },
                    ],
                }}
            />
        </DocsLayout>
    );
}
