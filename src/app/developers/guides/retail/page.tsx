"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";
import { CodeBlock } from "@/components/developers/CodeBlocks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RetailAffiliateGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Retail Submission Guide</h1>
                <p className="text-xl text-muted-foreground mb-4">
                    As a Retail Submission, you resell MITO&apos;s money transfer services directly to your own customers, earning commission. You can choose to build your own UI or use our Hosted Payment Pages.
                </p>
                <p className="text-base text-muted-foreground mb-12">
                    For detailed endpoint specifications and schemas, please refer to the <Link href="/developers/api-reference/retail-api" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">Retail API Reference <ArrowRight className="w-3.5 h-3.5" /></Link>.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="Retail Submission Flow (Hosted UI)">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Your Website" sublabel="Generate Session" type="user" />
                            <FlowArrow direction="right" label="Redirect" />
                            <FlowNode label="MITO Pay Page" sublabel="KYC & Card Capture" type="MITO" />
                            <FlowArrow direction="right" label="Return" />
                            <FlowNode label="Your Success Page" sublabel="Commission Earned" type="secondary" />
                        </div>
                    </FlowDiagram>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Step-by-Step Implementation</h2>
                    <StepFlow
                        steps={[
                            {
                                title: "1. Onboard user/Sender",
                                description: "Register the remitting customer (Sender) within your application and collect their baseline details."
                            },
                            {
                                title: "2. Get Active Corridors and Rates from Mito",
                                description: "Query the rates API to retrieve active currency corridors and fetch live FX exchange rates."
                            },
                            {
                                title: "3. Do KYC of Sender",
                                description: "Perform Identity Verification (KYC) on the sender in compliance with regulatory rules."
                            },
                            {
                                title: "4. Create and Submit beneficiary if it is a new beneficiary",
                                description: "Create a recipient (Beneficiary) profile on the network containing payout account or mobile wallet details."
                            },
                            {
                                title: "5. Get Purpose Codes",
                                description: "Fetch the legal remittance purpose codes required for the specific country corridor."
                            },
                            {
                                title: "6. Get Service Providers",
                                description: "Query supported payout service providers (banks, cash networks, or mobile operators) for the corridor."
                            },
                            {
                                title: "7. Submit Transaction",
                                description: "Initiate and submit the money transfer payload for processing by the MITO engine."
                            },
                            {
                                title: "8. Receive Response through Webhook",
                                description: "Listen to transaction webhooks to receive real-time, asynchronous transaction updates."
                            },
                            {
                                title: "9. Get Transaction details",
                                description: "Query transaction details using reference IDs to verify final status, fees, and payout receipts."
                            }
                        ]}
                    />
                </section>

                <section className="mb-16">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-4">Native Experience: MITO SDK</h2>
                        <p className="text-muted-foreground mb-6">
                            Instead of a full-page redirect, use the MITO Link SDK to provide a seamless, modal-based checkout experience that keeps users on your site.
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">1. Integration</h3>
                                <CodeBlock 
                                    code={`import { useMitoLink } from '@mito-money/mito-link';

const { open } = useMitoLink({
  linkToken: 'token_from_your_backend',
  publishableKey: 'pk_live_...',
  environment: 'production',
  linkType: 'retail-payment'
});`} 
                                    language="javascript" 
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">2. Server-Side Initiation</h3>
                                <CodeBlock 
                                    code={`POST /api/v1/transactions
{
  "sendAmount": 50,
  "sendCurrency": "GBP",
  "serviceCode": "retail-payment",
  "receiveCountryIso3": "NGA"
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
