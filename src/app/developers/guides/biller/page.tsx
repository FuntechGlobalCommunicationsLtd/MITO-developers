"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";
import { FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function BillerAffiliateGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "Biller integration",
                    partnerLabel: "Integration model · Biller",
                    description:
                        "Collect payments on your website for goods or services. MITO handles payment capture; you settle to your corporate bank account. Every transaction must include your registered Biller ID.",
                    authentication: {
                        summary:
                            "Biller uses Basic Authentication (not JWT). Encode username:password as Base64 and send AccessAffiliateNumber on every Business request.",
                        headers: [
                            { name: "Authorization", value: "Basic <base64(username:password)>" },
                            { name: "AccessAffiliateNumber", value: "Your affiliate collector number" },
                            { name: "Content-Type", value: "application/json" },
                        ],
                        docsHref: "/developers/api-reference/biller-api#auth",
                    },
                    prerequisites: [
                        "Signed biller contract and sandbox credentials.",
                        "Registered Biller ID — your unique merchant reference on MITO (required on every transaction).",
                        "Approved payout bank account for settlements.",
                        "Webhook endpoint configured to receive payment confirmations.",
                    ],
                    integrationMethods: [
                        { label: "REST API", href: "/developers/api-reference/biller-api", description: "Server-side collection initiation." },
                        { label: "Hosted checkout", href: "/developers/hosted-flows", description: "Redirect customers to MITO payment pages." },
                        { label: "SDK", href: "/developers/guides/sdk", description: "Embedded modal checkout on your site." },
                    ],
                    diagramTitle: "Biller collection & settlement",
                    diagram: (
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Customer checkout" sublabel="Card or pay by bank" type="user" />
                            <FlowArrow direction="right" label="Pay" />
                            <FlowNode label="MITO" sublabel="Collection API" type="MITO" />
                            <FlowArrow direction="right" label="Settle" />
                            <FlowNode label="Your bank" sublabel="Corporate payout" type="secondary" />
                        </div>
                    ),
                    phases: {
                        collect: [
                            {
                                title: "Authenticate",
                                description:
                                    "Use Basic Auth + AccessAffiliateNumber on every Business API call. Credentials come from your biller onboarding profile.",
                                apiLinks: [{ label: "Biller Authentication", href: "/developers/api-reference/biller-api#auth" }],
                            },
                            {
                                title: "Initiate collection",
                                description:
                                    "When a customer checks out, initiate a payment session with your Biller ID, amount, and payment mode (card or bank pay).",
                                apiLinks: [
                                    { label: "InitiateTransactions", href: "/developers/api-reference/biller-api#initiate-transaction" },
                                ],
                            },
                            {
                                title: "Customer completes payment",
                                description:
                                    "Customer pays via hosted page, SDK modal, or inline flow depending on your integration method.",
                                apiLinks: [
                                    { label: "Hosted checkout guide", href: "/developers/hosted-flows" },
                                    { label: "SDK guide", href: "/developers/guides/sdk" },
                                ],
                            },
                        ],
                        processForex: [
                            {
                                title: "Confirm payment captured",
                                description:
                                    "Wait for webhook confirmation or poll transaction status before releasing goods or services. Always verify server-side.",
                                apiLinks: [
                                    { label: "GetTransactionStatus", href: "/developers/api-reference/biller-api#get-status" },
                                ],
                                webhookLinks: [
                                    { label: "PAYMENT_CAPTURED", href: "/developers/webhooks" },
                                    { label: "TRANSACTION_COMPLETED", href: "/developers/webhooks" },
                                ],
                            },
                            {
                                title: "Reconcile wallet balance",
                                description: "Collected funds (minus MITO fees) reflect in your biller wallet balance.",
                                apiLinks: [
                                    { label: "Balances", href: "/developers/api-reference/biller-api#get-balances" },
                                ],
                            },
                        ],
                        disburse: [
                            {
                                title: "Payout to bank",
                                description: "Withdraw aggregated wallet balance to your approved corporate bank account.",
                                apiLinks: [
                                    { label: "CreatePayout", href: "/developers/api-reference/biller-api#create-payout" },
                                    { label: "AddPayoutAccount", href: "/developers/api-reference/biller-api#add-payout-account" },
                                ],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "PAYMENT_CAPTURED", href: "/developers/webhooks", when: "Payment successfully captured." },
                        { name: "TRANSACTION_COMPLETED", href: "/developers/webhooks", when: "Transaction fully completed." },
                    ],
                    statusFlow: ["pending", "processing", "completed", "failed"],
                    credentialsService: "biller",
                    apiGroups: [
                        {
                            id: "apis-workflow",
                            title: "Workflow APIs",
                            description: "Basic Auth first, then collect → confirm → settle.",
                            apis: [
                                { method: "POST", path: "Basic Auth + AccessAffiliateNumber", title: "Authenticate (Biller)", href: "/developers/api-reference/biller-api#auth" },
                                { method: "POST", path: "/api/v2/Business/InitiateTransactions", title: "Initiate collection", href: "/developers/api-reference/biller-api#initiate-transaction" },
                                { method: "GET", path: "/api/v2/Business/GetTransactionStatus", title: "Transaction status", href: "/developers/api-reference/biller-api#get-status" },
                                { method: "GET", path: "/api/v2/Business/PaymentConfirmation", title: "Payment confirmation", href: "/developers/api-reference/biller-api#payment-confirmation" },
                                { method: "GET", path: "/api/v2/Business/SwitchPaymentMode", title: "Switch payment mode", href: "/developers/api-reference/biller-api#switch-payment-mode" },
                                { method: "POST", path: "/api/v2/payout/CreatePayout", title: "Create payout", href: "/developers/api-reference/biller-api#create-payout" },
                            ],
                        },
                        {
                            id: "apis-helper",
                            title: "Helper APIs",
                            description: "Lookup, reconciliation, account setup, reports, and refunds.",
                            apis: [
                                { method: "GET", path: "/api/v2/Business/GetTransactions", title: "List transactions", href: "/developers/api-reference/biller-api#get-transactions" },
                                { method: "GET", path: "/api/v2/Business/balances", title: "Wallet balances", href: "/developers/api-reference/biller-api#get-balances" },
                                { method: "POST", path: "/api/v2/Payout/AddPayoutAccount", title: "Add payout account", href: "/developers/api-reference/biller-api#add-payout-account" },
                                { method: "GET", path: "/api/v2/payout/GetPayoutAccounts", title: "Get payout accounts", href: "/developers/api-reference/biller-api#get-payout-accounts" },
                                { method: "GET", path: "/api/v2/payout/report", title: "Payout report", href: "/developers/api-reference/biller-api#get-payout-report" },
                                { method: "POST", path: "/api/v2/Refund/CreateRefund", title: "Create refund", href: "/developers/api-reference/biller-api#create-refund" },
                                { method: "GET", path: "/api/v2/Refund/GetRefund", title: "Get refund details", href: "/developers/api-reference/biller-api#get-refund" },
                                { method: "GET", path: "/api/v2/Refund/GetRefundList", title: "List refunds", href: "/developers/api-reference/biller-api#get-refund-list" },
                            ],
                        },
                    ],
                }}
            />
        </DocsLayout>
    );
}
