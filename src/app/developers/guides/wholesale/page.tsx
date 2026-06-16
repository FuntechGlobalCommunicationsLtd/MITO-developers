"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";
import { CodeBlock } from "@/components/developers/CodeBlocks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WholesaleBillerGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Wholesale Biller Guide</h1>
                <p className="text-xl text-muted-foreground mb-4">
                    As a Wholesale Biller or Super-Merchant, you use MITO to act as a payment aggregator for your own sub-merchants. MITO handles the pooled collection and settlement engine.
                </p>
                <p className="text-base text-muted-foreground mb-12">
                    For detailed endpoint specifications and schemas, please refer to the <Link href="/developers/api-reference/biller-api" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">Biller API Reference <ArrowRight className="w-3.5 h-3.5" /></Link>.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                    <FlowDiagram title="Wholesale Aggregation Model">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-4">
                                <FlowNode label="Sub-Merchant A" type="user" />
                                <FlowNode label="Sub-Merchant B" type="user" />
                            </div>
                            <FlowArrow direction="both" label="MITO Payframe" />
                            <div className="flex items-center gap-4">
                                <FlowNode label="MITO Engine" sublabel="Aggregated Wallet" type="MITO" />
                                <FlowArrow direction="right" label="Reconciliation File" />
                                <FlowNode label="Your System" sublabel="Your Backend" type="secondary" />
                            </div>
                        </div>
                    </FlowDiagram>
                </section>

                <section className="mb-16">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-4">Optimized Collections: MITO SDK</h2>
                        <p className="text-muted-foreground mb-6">
                            For high-volume sub-merchant aggregation, use the MITO Link SDK with the <code>retail-collection</code> flow to automate onboarding and reconciliation.
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">SDK Configuration</h3>
                                <CodeBlock 
                                    code={`import { useMitoLink } from '@mito-money/mito-link';

const { open } = useMitoLink({
  linkToken: 'token_from_your_backend',
  publishableKey: 'pk_live_...',
  environment: 'production',
  linkType: 'retail-collection'
});`} 
                                    language="javascript" 
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Initiation Request</h3>
                                <CodeBlock 
                                    code={`POST /api/v1/transactions
{
  "sendAmount": 1000,
  "sendCurrency": "USD",
  "serviceCode": "retail-collection",
  "subMerchantId": "sub_12345"
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
