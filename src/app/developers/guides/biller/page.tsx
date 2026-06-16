"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";
import { CodeBlock } from "@/components/developers/CodeBlocks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BillerAffiliateGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Biller Submission Guide</h1>
                <p className="text-xl text-muted-foreground mb-4">
                    As a Biller Submission, you sell goods or services and use MITO to collect funds and settle them to your local bank account.
                </p>
                <p className="text-base text-muted-foreground mb-12">
                    For detailed endpoint specifications and schemas, please refer to the <Link href="/developers/api-reference/biller-api" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">Biller API Reference <ArrowRight className="w-3.5 h-3.5" /></Link>.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="Biller Collection & Settlement">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Customer Checkout" sublabel="Card or Pay by Bank" type="user" />
                            <FlowArrow direction="right" label="Pay" />
                            <FlowNode label="MITO Engine" sublabel="Biller Collection API" type="MITO" />
                            <FlowArrow direction="right" label="Settlement" />
                            <FlowNode label="Your Corporate Bank" sublabel="Daily Payout" type="secondary" />
                        </div>
                    </FlowDiagram>
                </section>
 
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Step-by-Step Implementation</h2>
                    <StepFlow
                        steps={[
                            {
                                title: "1. Trigger Collection",
                                description: "When a customer checks out, call POST /api/v2/Business/InitiateTransactions with the paymentMode set to Card (CARDCHECKOUT) or Pay by Bank (BANKPAYMENT or PLAID) to generate a payment session."
                            },
                            {
                                title: "2. Listen for Confirmation",
                                description: "Wait for the transaction webhook callback (PAYMENT_CAPTURED or TRANSACTION_COMPLETED) or query status using GET /api/v2/Business/GetTransactionStatus before releasing goods or services."
                            },
                            {
                                title: "3. Reconcile Balance",
                                description: "The collected funds (minus MITO fees) will instantly reflect in your Biller wallet balance."
                            },
                            {
                                title: "4. Settle / Payout",
                                description: "Use the POST /api/v2/payout/CreatePayout endpoint to withdraw your aggregated wallet balance to your approved corporate bank account."
                            }
                        ]}
                    />
                </section>

                <section className="mb-16">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-4">New: MITO SDK Integration</h2>
                        <p className="text-muted-foreground mb-6">
                            Streamline your checkout with the MITO Link SDK. Perfect for embedding a native-feel checkout experience directly into your web application.
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">1. Install Package</h3>
                                <CodeBlock code="npm install @mito-money/mito-link" language="bash" />
                                
                                <h3 className="text-lg font-semibold mt-6">2. Initialize on Frontend</h3>
                                <CodeBlock 
                                    code={`import { useMitoLink } from '@mito-money/mito-link';

const { open } = useMitoLink({
  linkToken: 'token_from_your_backend',
  publishableKey: 'pk_test_...',
  environment: 'sandbox',
  linkType: 'bill-payment'
});`} 
                                    language="javascript" 
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Backend Initiation</h3>
                                <p className="text-sm text-muted-foreground">First, call our API from your server to initiate a collection transaction and obtain a redirect/payment URL:</p>
                                <CodeBlock 
                                    code={`POST /api/v2/Business/InitiateTransactions
{
  "billerId": "bill_778899",
  "partnerReferenceNumber": "INV-2026-001",
  "sendAmount": 100,
  "senderFirstName": "John",
  "senderLastName": "Doe",
  "senderMobileNumber": "+447700900088",
  "paymentMode": "CARDCHECKOUT",
  "callbackurl": "https://yourwebsite.com/api/webhooks/mito"
}`} 
                                    language="json" 
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
