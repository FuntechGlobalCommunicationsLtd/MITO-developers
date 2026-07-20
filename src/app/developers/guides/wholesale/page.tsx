"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";
import { FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function WholesaleBillerGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "Wholesale biller integration",
                    partnerLabel: "Integration model · Biller · Wholesale",
                    description:
                        "Act as a payment aggregator for sub-merchants. MITO handles pooled collection; you reconcile and distribute to merchants on your platform.",
                    prerequisites: [
                        "Wholesale biller contract with MITO.",
                        "Master Biller ID and sub-merchant reference scheme agreed with MITO.",
                        "Reconciliation process for sub-merchant attribution.",
                        "Webhook endpoint for collection confirmations.",
                    ],
                    integrationMethods: [
                        { label: "REST API", href: "/developers/guides/biller", description: "Same collection APIs with sub-merchant references." },
                        { label: "SDK", href: "/developers/guides/sdk", description: "Embedded checkout with retail-collection flow." },
                    ],
                    diagramTitle: "Wholesale aggregation model",
                    diagram: (
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-4">
                                <FlowNode label="Sub-merchant A" type="user" />
                                <FlowNode label="Sub-merchant B" type="user" />
                            </div>
                            <FlowArrow direction="both" label="MITO checkout" />
                            <div className="flex items-center gap-4">
                                <FlowNode label="MITO" sublabel="Aggregated wallet" type="MITO" />
                                <FlowArrow direction="right" label="Reconcile" />
                                <FlowNode label="Your system" sublabel="Sub-merchant split" type="secondary" />
                            </div>
                        </div>
                    ),
                    phases: {
                        collect: [
                            {
                                title: "Initiate sub-merchant collection",
                                description: "Call collection APIs with your Biller ID and a sub-merchant reference for attribution.",
                                apiLinks: [
                                    { label: "InitiateTransactions", href: "/developers/api-reference/biller-api#initiate-transaction" },
                                ],
                            },
                        ],
                        processForex: [
                            {
                                title: "Confirm and reconcile",
                                description: "Verify payment via webhook or status API. Map funds to sub-merchants in your system.",
                                apiLinks: [
                                    { label: "GetTransactionStatus", href: "/developers/api-reference/biller-api#get-status" },
                                    { label: "GetTransactions", href: "/developers/api-reference/biller-api#get-transactions" },
                                ],
                                webhookLinks: [{ label: "Webhook events", href: "/developers/webhooks" }],
                            },
                        ],
                        disburse: [
                            {
                                title: "Settle to platform bank",
                                description: "Payout aggregated balance to your corporate account, then distribute to sub-merchants per your model.",
                                apiLinks: [{ label: "CreatePayout", href: "/developers/api-reference/biller-api#create-payout" }],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "PAYMENT_CAPTURED", href: "/developers/webhooks", when: "Sub-merchant payment captured." },
                    ],
                    statusFlow: ["pending", "processing", "completed", "failed"],
                    credentialsService: "biller",
                    apisInvolved: [
                        { method: "POST", path: "/api/v2/Business/InitiateTransactions", title: "Initiate collection", href: "/developers/api-reference/biller-api#initiate-transaction" },
                        { method: "GET", path: "/api/v2/Business/GetTransactions", title: "List transactions", href: "/developers/api-reference/biller-api#get-transactions" },
                        { method: "POST", path: "/api/v2/payout/CreatePayout", title: "Create payout", href: "/developers/api-reference/biller-api#create-payout" },
                    ],
                }}
            />
        </DocsLayout>
    );
}
