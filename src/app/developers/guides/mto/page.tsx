"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { FlowDiagram, FlowNode, FlowArrow, StepFlow } from "@/components/developers/Flows";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function MtoGuidePage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">MTO Submission Guide</h1>
                    <p className="text-xl text-muted-foreground mb-4">
                        As a Money Transfer Operator (MTO), you own the customer relationship and UI. You use MITO&apos;s APIs strictly for backend remittance execution, routing, and FX.
                    </p>
                    <p className="text-base text-muted-foreground">
                        For detailed endpoint specifications and schemas, please refer to the <Link href="/developers/api-reference/mto-api" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">MTO API Reference <ArrowRight className="w-3.5 h-3.5" /></Link>.
                    </p>
                </div>

                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <section className="mb-0">
                        <h2 className="text-2xl font-bold mb-6">Integration Architecture</h2>
                        <FlowDiagram title="MTO Remittance Flow">
                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <FlowNode label="Your App" sublabel="Customer UI" type="user" />
                                <FlowArrow direction="both" label="REST APIs" />
                                <FlowNode label="MITO Engine" sublabel="FX & Routing Engine" type="MITO" />
                                <FlowArrow direction="right" label="Settlement" />
                                <FlowNode label="Destination Bank" sublabel="Payout Network" type="secondary" />
                            </div>
                        </FlowDiagram>
                    </section>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/v1/transfers"
                    title="Implementation Pipeline"
                    description="Follow these steps to integrate the MTO remittance flow into your application."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "JSON",
                                    language: "json",
                                    code: `{
  "quote_id": "qte_778899",
  "recipient": { ... }
}`
                                }
                            ]}
                        />
                    }
                >
                    <div className="space-y-8">
                        <StepFlow
                            steps={[
                                {
                                    title: "1. Onboard Corridors",
                                    description: "Work with MITO to activate your required source and destination countries."
                                },
                                {
                                    title: "2. Fetch FX Rates",
                                    description: "Call POST /v1/transfers/quote to get live rates."
                                },
                                {
                                    title: "3. Create Transfer",
                                    description: "Submit legacy payout details to /v1/transfers."
                                },
                                {
                                    title: "4. Webhooks",
                                    description: "Listen for asynchronous status updates."
                                }
                            ]}
                        />

                        <div className="pt-8 border-t space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm">
                                    <li>A signed MTO Submission contract.</li>
                                    <li>A pre-funded MITO operational wallet.</li>
                                    <li>PCI-compliant architecture for card payments.</li>
                                </ul>
                            </div>
                            
                            <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20 p-5 rounded-xl border border-border/60">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-sm text-foreground">Explore MTO API Reference</h3>
                                    <p className="text-xs text-muted-foreground">Check out the request formats, parameters, and full schema responses for all MTO endpoints.</p>
                                </div>
                                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white shrink-0 rounded-full px-5">
                                    <Link href="/developers/api-reference/mto-api" className="flex items-center gap-1.5 font-semibold">
                                        MTO API Reference <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </EndpointBlock>
            </div>
        </ApiReferenceLayout>
    );
}
