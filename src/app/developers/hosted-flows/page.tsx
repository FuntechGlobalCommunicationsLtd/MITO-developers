"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";
import { FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function HostedFlowsPage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "Hosted checkout",
                    partnerLabel: "Integration method · Hosted",
                    description:
                        "Redirect customers to MITO-hosted payment pages. MITO handles PCI scope, 3D Secure, and KYC document collection on secure infrastructure.",
                    prerequisites: [
                        "Partner credentials and enabled payment methods for your corridors.",
                        "success_url and cancel_url configured on your domain.",
                        "Webhook endpoint to confirm payment before fulfilling orders.",
                    ],
                    integrationMethods: [
                        { label: "Retail flow", href: "/developers/guides/retail", description: "C2C remittance via redirect." },
                        { label: "Biller flow", href: "/developers/guides/biller", description: "Collection via redirect." },
                        { label: "Hosted API reference", href: "/developers/api-reference/hosted", description: "Session creation endpoint and samples." },
                    ],
                    diagramTitle: "Web redirect checkout",
                    diagram: (
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Your site" sublabel="Create session" type="user" />
                            <FlowArrow direction="right" label="Redirect" />
                            <FlowNode label="MITO checkout" sublabel="Pay + KYC" type="MITO" />
                            <FlowArrow direction="right" label="Return URL" />
                            <FlowNode label="Your site" sublabel="Success / cancel" type="secondary" />
                        </div>
                    ),
                    phases: {
                        collect: [
                            {
                                title: "Create checkout session (server-side)",
                                description: "Your backend calls the session API and receives a MITO checkout URL.",
                                apiLinks: [
                                    { label: "POST /v1/checkout/sessions", href: "/developers/api-reference/hosted#v1-checkout-sessions" },
                                    { label: "Biller: InitiateTransactions", href: "/developers/api-reference/biller-api#initiate-transaction" },
                                ],
                            },
                            {
                                title: "Redirect customer",
                                description: "Send the customer to the MITO URL. They complete payment on MITO infrastructure.",
                            },
                        ],
                        processForex: [
                            {
                                title: "Customer completes on MITO",
                                description: "MITO processes card/bank authentication, FX where applicable, and compliance checks.",
                            },
                            {
                                title: "Return to your site",
                                description: "Customer is redirected to success_url or cancel_url. Do not rely on redirect alone for fulfillment.",
                                webhookLinks: [{ label: "Webhook events", href: "/developers/webhooks" }],
                            },
                        ],
                        disburse: [
                            {
                                title: "Confirm via webhook",
                                description: "Verify payment server-side via webhook before releasing goods or marking transfer complete.",
                                apiLinks: [
                                    { label: "GetTransactionStatus", href: "/developers/api-reference/biller-api#get-status" },
                                ],
                            },
                        ],
                    },
                    webhookEvents: [
                        { name: "PAYMENT_CAPTURED", href: "/developers/webhooks#events", when: "Biller collection captured." },
                        { name: "collection.completed", href: "/developers/webhooks#events", when: "Collection request paid." },
                        { name: "transfer.completed", href: "/developers/webhooks#events", when: "Retail transfer completed." },
                    ],
                    statusFlow: ["session.created", "processing", "completed", "failed"],
                    apisInvolved: [
                        { method: "POST", path: "/v1/checkout/sessions", title: "Create checkout session", href: "/developers/api-reference/hosted#v1-checkout-sessions" },
                        { method: "POST", path: "/api/v2/Business/InitiateTransactions", title: "Biller collection (hosted redirect URL)", href: "/developers/api-reference/biller-api#initiate-transaction" },
                    ],
                }}
            />
        </DocsLayout>
    );
}
