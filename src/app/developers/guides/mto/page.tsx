"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";
import { FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function MtoGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "MTO partner integration",
                    partnerLabel: "Integration model · MTO",
                    description:
                        "Send bulk remittance transactions via REST API or FTP batch. You own the customer UI; MITO handles FX routing and payout execution. Senders and beneficiaries are included in the transaction payload — sender registration in MITO is not required today.",
                    authentication: {
                        summary: "Obtain a Bearer token via Auth login, then send it on all MTO API calls.",
                        headers: [
                            { name: "Authorization", value: "Bearer <token from POST /api/v1/Auth/Login>" },
                            { name: "Content-Type", value: "application/json" },
                        ],
                        docsHref: "/developers/api-reference/mto-api#auth-login",
                    },
                    prerequisites: [
                        "Signed MTO partner contract.",
                        "Credentials from onboarding email (POST /api/v1/Auth/Login).",
                        "Pre-funded MITO operational wallet.",
                        "Activated corridors and payout bank account.",
                    ],
                    integrationMethods: [
                        { label: "REST API", href: "/developers/api-reference/mto-api", description: "Real-time transaction submission." },
                        { label: "FTP batch", href: "/developers/file-integration/mto-ftp", description: "Bulk pipe-delimited CSV over SFTP." },
                    ],
                    diagramTitle: "MTO remittance flow",
                    diagram: (
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Your app" sublabel="Customer UI" type="user" />
                            <FlowArrow direction="both" label="REST / FTP" />
                            <FlowNode label="MITO" sublabel="FX & routing" type="MITO" />
                            <FlowArrow direction="right" label="Payout" />
                            <FlowNode label="Destination" sublabel="Bank / wallet" type="secondary" />
                        </div>
                    ),
                    phases: {
                        collect: [
                            {
                                title: "Authenticate",
                                description: "Call POST /api/v1/Auth/Login and store the Bearer token for subsequent requests.",
                                apiLinks: [{ label: "Auth Login", href: "/developers/api-reference/mto-api#auth-login" }],
                            },
                            {
                                title: "Fund operational wallet",
                                description: "Ensure your MITO wallet has sufficient balance to cover submitted transfers and fees.",
                            },
                        ],
                        processForex: [
                            {
                                title: "Activate corridors",
                                description: "Work with MITO to enable required source and destination country pairs.",
                            },
                            {
                                title: "Fetch FX rate",
                                description: "Get corridors then request rate for corridor, provider, and amount.",
                                apiLinks: [
                                    { label: "GET Exchange/corridors", href: "/developers/api-reference/mto-api#exchange-corridors" },
                                    { label: "POST Exchange/rates", href: "/developers/api-reference/mto-api#exchange-rates" },
                                ],
                            },
                            {
                                title: "Get payout provider",
                                description: "Lookup provider by country, currency, and service code.",
                                apiLinks: [{ label: "GET Lookups/provider", href: "/developers/api-reference/mto-api#lookups-provider" }],
                            },
                        ],
                        disburse: [
                            {
                                title: "Add settlement account",
                                description: "Register bank account for scheduled payouts.",
                                apiLinks: [{ label: "AddSettlementAccount", href: "/developers/api-reference/mto-api#add-settlement-account" }],
                            },
                            {
                                title: "Track payouts & status",
                                description: "Poll payout history or receive payout_initiated / payout_completed / payout_failed webhooks.",
                                apiLinks: [
                                    { label: "GET Mto/Payouts", href: "/developers/api-reference/mto-api#mto-payouts" },
                                ],
                                webhookLinks: [{ label: "MTO payout webhooks", href: "/developers/webhooks#events" }],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "payout_initiated", href: "/developers/webhooks#events", when: "Settlement debited, payout enqueued." },
                        { name: "payout_completed", href: "/developers/webhooks#events", when: "Payout reached successful terminal status." },
                        { name: "payout_failed", href: "/developers/webhooks#events", when: "Payout failed or unresolved." },
                    ],
                    statusFlow: ["pending", "processing", "completed", "failed"],
                    credentialsService: "mto",
                    apiGroups: [
                        {
                            id: "apis-workflow",
                            title: "Workflow APIs",
                            description: "Auth → quote → create → status.",
                            apis: [
                                { method: "POST", path: "/api/v1/Auth/Login", title: "Authenticate", href: "/developers/api-reference/mto-api#auth-login" },
                                { method: "GET", path: "/api/v1/mito/Exchange/corridors", title: "Corridors", href: "/developers/api-reference/mto-api#exchange-corridors" },
                                { method: "POST", path: "/api/v1/mito/Exchange/rates", title: "Exchange rate", href: "/developers/api-reference/mto-api#exchange-rates" },
                                { method: "POST", path: "/api/v1/Mto/TransactionCreate", title: "Create transaction", href: "/developers/api-reference/mto-api#create-transaction" },
                                { method: "GET", path: "/api/v1/mito/Mto/TransactionDetails", title: "Transaction detail", href: "/developers/api-reference/mto-api#get-transaction" },
                            ],
                        },
                        {
                            id: "apis-helper",
                            title: "Helper APIs",
                            description: "Balances, settlement accounts, and payout history.",
                            apis: [
                                { method: "GET", path: "/api/v1/mito/Lookups/provider", title: "Providers", href: "/developers/api-reference/mto-api#lookups-provider" },
                                { method: "GET", path: "/api/v1/mito/Users/{userId}/balances", title: "Balances", href: "/developers/api-reference/mto-api#user-balances" },
                                { method: "POST", path: "/api/v1/MTO/AddSettlementAccount", title: "Add settlement account", href: "/developers/api-reference/mto-api#add-settlement-account" },
                                { method: "GET", path: "/api/v1/mito/Mto/Payouts", title: "Payout history", href: "/developers/api-reference/mto-api#mto-payouts" },
                            ],
                        },
                    ],
                }}
            />
        </DocsLayout>
    );
}
