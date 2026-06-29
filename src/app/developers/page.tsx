"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { HeroSection, CapabilityCard, IntegrationTypeCard } from "@/components/developers/HeroCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    CreditCard,
    ArrowRightLeft,
    ShieldCheck,
    Network,
    BookOpen,
    Terminal,
    FileCode2,
    PhoneCall,
    Laptop
} from "lucide-react";

export default function DevelopersLandingPage() {
    return (
        <DocsLayout showSidebar={false}>
            {/* Hero Section */}
            <HeroSection
                title="Integrate with MITO"
                description="The unified premium platform for payments, forex, verification, affiliate enablement, and collections. Build world-class financial experiences with our developer-friendly APIs."
            >
                <Link href="/developers/get-started">
                    <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-semibold">
                        Get Started
                    </Button>
                </Link>
                <Link href="/developers/api-reference">
                    <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold">
                        API Reference
                    </Button>
                </Link>
            </HeroSection>

            <div className="max-w-6xl mx-auto space-y-24 px-4 pb-20">

                {/* Quick Actions */}
                <section>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/developers/guides" className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors group border border-border/50">
                            <BookOpen className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="font-medium text-sm">Documentation</span>
                        </Link>
                        <Link href="/developers/guides/sdk" className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors group border border-border/50">
                            <FileCode2 className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="font-medium text-sm">SDKs</span>
                        </Link>
                        <Link href="/developers/webhooks" className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors group border border-border/50">
                            <Network className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="font-medium text-sm">Webhooks</span>
                        </Link>
                        <Link href="/developers/hosted-flows" className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors group border border-border/50">
                            <Laptop className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="font-medium text-sm">Hosted Flows</span>
                        </Link>
                    </div>
                </section>

                {/* Transaction model */}
                <section>
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Every transfer has three phases</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Collect funds, process and convert, then disburse — documented by flow in Documentation and by capability in API Reference.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link href="/developers/api-reference/collect">
                            <CapabilityCard
                                title="Collect"
                                description="Card, bank pay, wallets, and hosted checkout across multiple currencies."
                                icon={<CreditCard className="w-6 h-6" />}
                            />
                        </Link>
                        <Link href="/developers/api-reference/process-forex">
                            <CapabilityCard
                                title="Process / Forex"
                                description="FX quotes, corridor routing, compliance, and async processing."
                                icon={<ArrowRightLeft className="w-6 h-6" />}
                            />
                        </Link>
                        <Link href="/developers/api-reference/disburse">
                            <CapabilityCard
                                title="Disburse"
                                description="Payouts to beneficiaries, biller settlements, and bank validation."
                                icon={<Terminal className="w-6 h-6" />}
                            />
                        </Link>
                        <Link href="/developers/api-reference/manage">
                            <CapabilityCard
                                title="Manage"
                                description="Auth, balances, webhooks, status polling, and platform config."
                                icon={<ShieldCheck className="w-6 h-6" />}
                            />
                        </Link>
                    </div>
                </section>

                {/* Integration Architecture */}
                <section className="bg-muted/20 rounded-3xl p-8 md:p-12 border">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Choose your integration model</h2>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                Pick the partner path that matches your business — each guide walks through Collect → Process / Forex → Disburse for your integration method.
                            </p>
                            <div className="space-y-4">
                                <IntegrationTypeCard
                                    title="MTO Partner"
                                    description="Bulk remittance via REST API or FTP. You own the UI; MITO handles FX and payout rails."
                                    href="/developers/guides/mto"
                                />
                                <IntegrationTypeCard
                                    title="Retail Affiliate"
                                    description="C2C remittance via API, hosted checkout, SDK, or embedded widget."
                                    href="/developers/guides/retail"
                                />
                                <IntegrationTypeCard
                                    title="Biller"
                                    description="Collect on your site with a registered Biller ID; settle to your bank account."
                                    href="/developers/guides/biller"
                                />
                                <IntegrationTypeCard
                                    title="Wholesale Biller"
                                    description="Onboard merchants and collect money on their behalf with pooled settlements."
                                    href="/developers/guides/wholesale"
                                />
                                <IntegrationTypeCard
                                    title="SDK Integration"
                                    description="Best for Third-Party Developers building custom checkout experiences on Web or Mobile."
                                    href="/developers/guides/sdk"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            {/* Abstract Architecture Visual */}
                            <div className="aspect-square rounded-full border border-primary/20 bg-background shadow-2xl flex items-center justify-center p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                                <div className="w-32 h-32 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-3xl shadow-lg z-10 relative">
                                    MITO
                                    <div className="absolute -inset-4 border-2 border-primary/30 rounded-2xl animate-[spin_10s_linear_infinite]"></div>
                                    <div className="absolute -inset-8 border border-primary/10 rounded-2xl auto-spin-reverse"></div>
                                </div>

                                {/* Orbital nodes */}
                                <div className="absolute top-12 lg:top-8 left-1/2 -translate-x-1/2 bg-card border shadow-sm px-4 py-2 rounded-full text-sm font-semibold z-10 text-foreground">APIs</div>
                                <div className="absolute bottom-12 lg:bottom-8 left-1/2 -translate-x-1/2 bg-card border shadow-sm px-4 py-2 rounded-full text-sm font-semibold z-10">Webhooks</div>
                                <div className="absolute left-4 lg:left-0 top-1/2 -translate-y-1/2 bg-card border shadow-sm px-4 py-2 rounded-full text-sm font-semibold z-10">Hosted Flows</div>
                                <div className="absolute right-4 lg:right-0 top-1/2 -translate-y-1/2 bg-card border shadow-sm px-4 py-2 rounded-full text-sm font-semibold z-10">Files / FTP</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-primary text-primary-foreground rounded-2xl p-12 shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">Ready to test in Sandbox?</h2>
                    <p className="max-w-2xl mx-auto text-primary-foreground/80 mb-8 text-lg">
                        Create a partner account, grab your test API keys, and start building with MITO in minutes.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href="https://mito.money/contact-us" target="_blank">
                            <Button size="lg" variant="secondary" className="rounded-full px-8 text-primary font-bold">
                                Request Sandbox Access
                            </Button>
                        </Link>
                        <Link href="/developers/support">
                            <Button size="lg" variant="outline" className="rounded-full bg-transparent px-8 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground text-primary-foreground">
                                <PhoneCall className="mr-2 w-4 h-4" />
                                Contact Integration Team
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
