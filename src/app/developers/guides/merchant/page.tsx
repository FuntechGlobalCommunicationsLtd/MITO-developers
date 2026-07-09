"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";
import { FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function MerchantBillerGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "Merchant biller integration",
                    partnerLabel: "Integration model · Biller · Merchant",
                    description:
                        "Single-merchant biller setup — integrate MITO directly into your checkout to accept customer payments and settle to your bank account.",
                    prerequisites: [
                        "Merchant biller contract and registered Biller ID.",
                        "Approved corporate bank account for payouts.",
                        "Checkout flow with server-side payment initiation.",
                        "Webhook endpoint for payment confirmations.",
                    ],
                    integrationMethods: [
                        { label: "REST API", href: "/developers/guides/biller", description: "Direct API integration at checkout." },
                        { label: "Hosted checkout", href: "/developers/hosted-flows", description: "Redirect to MITO payment page." },
                        { label: "SDK", href: "/developers/guides/sdk", description: "Embedded bill-payment checkout." },
                    ],
                    diagramTitle: "Merchant checkout flow",
                    diagram: (
                        <div className="flex flex-col items-center gap-4">
                            <FlowNode label="End customer" type="user" />
                            <FlowArrow direction="down" label="Checkout" />
                            <div className="flex items-center gap-4">
                                <FlowNode label="Your website" sublabel="API client" type="secondary" />
                                <FlowArrow direction="right" label="Pay" />
                                <FlowNode label="MITO" sublabel="Payment processor" type="MITO" />
                            </div>
                        </div>
                    ),
                    phases: {
                        collect: [
                            {
                                title: "Initiate payment at checkout",
                                description: "Call the collection API with your Biller ID when the customer completes checkout.",
                                apiLinks: [
                                    { label: "InitiateTransactions", href: "/developers/api-reference/biller-api#api-v2-Business-InitiateTransactions" },
                                ],
                            },
                        ],
                        processForex: [
                            {
                                title: "Confirm payment",
                                description: "Verify capture via webhook or status poll before fulfilling the order.",
                                apiLinks: [
                                    { label: "GetTransactionStatus", href: "/developers/api-reference/biller-api#api-v2-Business-GetTransactionStatus" },
                                ],
                                webhookLinks: [{ label: "PAYMENT_CAPTURED", href: "/developers/webhooks" }],
                            },
                        ],
                        disburse: [
                            {
                                title: "Settle to bank",
                                description: "Withdraw wallet balance to your registered corporate bank account.",
                                apiLinks: [{ label: "CreatePayout", href: "/developers/api-reference/biller-api#api-v2-payout-CreatePayout" }],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "PAYMENT_CAPTURED", href: "/developers/webhooks", when: "Customer payment captured." },
                        { name: "TRANSACTION_COMPLETED", href: "/developers/webhooks", when: "Transaction fully settled." },
                    ],
                    statusFlow: ["pending", "processing", "completed", "failed"],
                    credentialsService: "biller",
                    apisInvolved: [
                        { method: "POST", path: "/api/v2/Business/InitiateTransactions", title: "Initiate collection", href: "/developers/api-reference/collect#api-v2-Business-InitiateTransactions" },
                        { method: "GET", path: "/api/v2/Business/GetTransactionStatus", title: "Transaction status", href: "/developers/api-reference/manage#api-v2-Business-GetTransactionStatus" },
                        { method: "POST", path: "/api/v2/payout/CreatePayout", title: "Create payout", href: "/developers/api-reference/disburse#api-v2-payout-CreatePayout" },
                    ],
                }}
            />
        </DocsLayout>
    );
}
