"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SettlementPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Platform</p>
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Settlement & wallets</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    How collected funds move through MITO wallets, how fees are applied, and how you reconcile payouts to your bank.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Wallet model</h2>
                    <p className="text-muted-foreground mb-6">
                        Affiliates and billers receive virtual wallets per currency (GBP, EUR, NGN, etc.). Collections credit the wallet; disbursements debit it.
                    </p>
                    <FlowDiagram title="Typical biller settlement">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <FlowNode label="Customer payment" sublabel="£100.00" type="user" />
                            <FlowArrow direction="right" label="Fee" />
                            <FlowNode label="GBP wallet" sublabel="£99.00" type="MITO" />
                            <FlowArrow direction="right" label="Payout" />
                            <FlowNode label="Your bank" sublabel="Received" type="secondary" />
                        </div>
                    </FlowDiagram>
                </section>

                <section className="mb-12 space-y-8">
                    <h2 className="text-2xl font-bold">Settlement flow</h2>

                    <div className="border-l-4 border-primary pl-6">
                        <h3 className="font-bold mb-1">1. Collect</h3>
                        <p className="text-sm text-muted-foreground">Payment captured → funds credited to wallet (minus MITO fees).</p>
                        <Link href="/developers/api-reference/collect" className="text-sm text-primary font-semibold hover:underline mt-2 inline-block">
                            Collect APIs →
                        </Link>
                    </div>

                    <div className="border-l-4 border-primary pl-6">
                        <h3 className="font-bold mb-1">2. Process / Forex</h3>
                        <p className="text-sm text-muted-foreground">For multi-currency operations, FX conversion may occur before funds are available for payout.</p>
                        <Link href="/developers/api-reference/process-forex" className="text-sm text-primary font-semibold hover:underline mt-2 inline-block">
                            Process / Forex APIs →
                        </Link>
                    </div>

                    <div className="border-l-4 border-primary pl-6">
                        <h3 className="font-bold mb-1">3. Disburse</h3>
                        <p className="text-sm text-muted-foreground">Withdraw wallet balance to your registered corporate bank account.</p>
                        <Link href="/developers/api-reference/disburse" className="text-sm text-primary font-semibold hover:underline mt-2 inline-block">
                            Disburse APIs →
                        </Link>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Reconciliation</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Match webhook events and transaction references to wallet movements.</li>
                        <li>Use balance and transaction list APIs for daily reconciliation.</li>
                        <li>Payout reports available for biller partners.</li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Link href="/developers/api-reference/biller-api#api-v2-Business-balances" className="text-sm font-medium px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary">
                            Wallet balances
                        </Link>
                        <Link href="/developers/api-reference/biller-api#api-v2-payout-report" className="text-sm font-medium px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary">
                            Payout report
                        </Link>
                        <Link href="/developers/webhooks" className="text-sm font-medium px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary">
                            Webhooks
                        </Link>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Related integration flows</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link href="/developers/guides/biller" className="p-4 rounded-xl border hover:border-primary/40 group">
                            <p className="font-semibold group-hover:text-primary">Biller</p>
                            <p className="text-xs text-muted-foreground mt-1">Collection → wallet → bank payout</p>
                        </Link>
                        <Link href="/developers/guides/wholesale" className="p-4 rounded-xl border hover:border-primary/40 group">
                            <p className="font-semibold group-hover:text-primary">Wholesale biller</p>
                            <p className="text-xs text-muted-foreground mt-1">Aggregated sub-merchant settlement</p>
                        </Link>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
