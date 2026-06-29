"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";
import { FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function RetailAffiliateGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "Retail affiliate integration",
                    partnerLabel: "Integration model · Retail",
                    description:
                        "Resell MITO remittance services to end customers and earn commission. Build your own UI or use hosted pages, SDK, or widget.",
                    prerequisites: [
                        "Retail affiliate contract and API credentials.",
                        "Enabled corridors for your target countries.",
                        "KYC/compliance flow for senders (regulatory requirements per corridor).",
                        "Webhook endpoint for async transaction updates.",
                    ],
                    integrationMethods: [
                        { label: "REST API", href: "/developers/guides/retail", description: "Full custom UI with MITO backend rails." },
                        { label: "Hosted checkout", href: "/developers/hosted-flows", description: "Redirect to MITO payment and KYC pages." },
                        { label: "SDK & widget", href: "/developers/guides/sdk", description: "Embedded checkout without full redirect." },
                    ],
                    diagramTitle: "Retail remittance flow",
                    diagram: (
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Your website" sublabel="Session / API" type="user" />
                            <FlowArrow direction="right" label="Transfer" />
                            <FlowNode label="MITO" sublabel="FX & routing" type="MITO" />
                            <FlowArrow direction="right" label="Payout" />
                            <FlowNode label="Beneficiary" sublabel="Bank or wallet" type="secondary" />
                        </div>
                    ),
                    phases: {
                        collect: [
                            {
                                title: "Register sender",
                                description: "Onboard the remitting customer and collect baseline identity details.",
                                apiLinks: [{ label: "Create user", href: "/developers/api-reference/retail-api#users" }],
                            },
                            {
                                title: "Verify sender (KYC)",
                                description: "Complete identity verification in compliance with corridor regulations.",
                            },
                        ],
                        processForex: [
                            {
                                title: "Get corridors and rates",
                                description: "Query active corridors and live FX exchange rates before quoting the customer.",
                                apiLinks: [
                                    { label: "Corridors", href: "/developers/api-reference/retail-api#exchange-Corridors" },
                                    { label: "Rates", href: "/developers/api-reference/retail-api#exchange-rates" },
                                ],
                            },
                            {
                                title: "Prepare transaction metadata",
                                description: "Fetch purpose codes and payout service providers for the destination corridor.",
                                apiLinks: [
                                    { label: "Providers", href: "/developers/api-reference/retail-api#lookups-provider" },
                                ],
                            },
                            {
                                title: "Submit transaction",
                                description: "Initiate the money transfer for processing by the MITO engine.",
                                apiLinks: [{ label: "Create transaction", href: "/developers/api-reference/retail-api#transactions" }],
                            },
                        ],
                        disburse: [
                            {
                                title: "Create beneficiary",
                                description: "Register payout destination (bank account or mobile wallet) if not already saved.",
                                apiLinks: [{ label: "Beneficiaries", href: "/developers/api-reference/retail-api#beneficiaries" }],
                            },
                            {
                                title: "Confirm via webhook",
                                description: "Listen for async status updates before showing final confirmation to the customer.",
                                webhookLinks: [{ label: "Webhook events", href: "/developers/webhooks" }],
                            },
                            {
                                title: "Retrieve transaction details",
                                description: "Query final status, fees, and payout receipt using the transaction reference.",
                                apiLinks: [{ label: "Get transaction", href: "/developers/api-reference/retail-api#transactions-{transactionId}" }],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "transfer.completed", href: "/developers/webhooks", when: "Transfer successfully disbursed." },
                        { name: "transfer.failed", href: "/developers/webhooks", when: "Transfer failed or was reversed." },
                    ],
                    statusFlow: ["pending", "processing", "completed", "failed"],
                    credentialsService: "retail",
                    apisInvolved: [
                        { method: "POST", path: "/auth/login", title: "Authenticate", href: "/developers/api-reference/manage#auth-login" },
                        { method: "GET", path: "/exchange/rates", title: "FX rates", href: "/developers/api-reference/process-forex#exchange-rates" },
                        { method: "POST", path: "/beneficiaries", title: "Create beneficiary", href: "/developers/api-reference/disburse#beneficiaries" },
                        { method: "POST", path: "/transactions", title: "Create transaction", href: "/developers/api-reference/collect#transactions" },
                    ],
                }}
            />
        </DocsLayout>
    );
}
