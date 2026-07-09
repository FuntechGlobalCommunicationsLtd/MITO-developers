"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IntegrationTypeCard } from "@/components/developers/HeroCards";

const partnerFlows = [
    {
        title: "Retail affiliate",
        description: "C2C remittance for end customers.",
        href: "/developers/guides/retail",
    },
    {
        title: "Biller",
        description: "Collect on your site with a registered Biller ID.",
        href: "/developers/guides/biller",
    },
    {
        title: "MTO partner",
        description: "Bulk remittance via REST API or FTP batch.",
        href: "/developers/guides/mto",
    },
];

const integrationMethods = [
    { title: "Hosted checkout", href: "/developers/hosted-flows", description: "Redirect to MITO payment pages" },
    { title: "SDK & widget", href: "/developers/guides/sdk", description: "Embedded modal checkout" },
    { title: "File / SFTP", href: "/developers/file-integration", description: "Batch file exchange for MTO" },
];

export default function GuidesIndexPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Documentation</h1>
                <p className="text-xl text-muted-foreground mb-4">
                    Integration flows by partner type. Every guide follows{" "}
                    <strong className="text-foreground">Collect → Process / Forex → Disburse</strong>.
                </p>
                <p className="text-muted-foreground mb-12">
                    Endpoint specs:{" "}
                    <Link href="/developers/api-reference" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                        API Reference <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </p>

                <section className="mb-12">
                    <h2 id="models" className="text-2xl font-bold mb-6">Integration models</h2>
                    <div className="space-y-4">
                        {partnerFlows.map((partner) => (
                            <Link
                                key={partner.href}
                                href={partner.href}
                                className="block border rounded-xl p-6 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                            >
                                <h3 className="text-lg font-bold group-hover:text-primary flex items-center gap-2">
                                    {partner.title}
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                                </h3>
                                <p className="text-muted-foreground mt-1 text-sm">{partner.description}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                        <IntegrationTypeCard title="Wholesale biller" description="Sub-merchant aggregation and pooled settlement." href="/developers/guides/wholesale" />
                        <IntegrationTypeCard title="Merchant biller" description="Single-merchant checkout integration." href="/developers/guides/merchant" />
                    </div>
                </section>

                <section className="mb-12">
                    <h2 id="methods" className="text-2xl font-bold mb-6">Integration methods</h2>
                    <p className="text-sm text-muted-foreground mb-4">Shared across partner types — not tied to one model.</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {integrationMethods.map((m) => (
                            <Link key={m.href} href={m.href} className="p-4 rounded-xl border hover:border-primary/40 hover:bg-primary/5 group">
                                <p className="font-semibold text-sm group-hover:text-primary">{m.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 id="platform" className="text-2xl font-bold mb-6">Platform</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link href="/developers/webhooks" className="p-4 rounded-xl border hover:border-primary/40 group">
                            <p className="font-semibold group-hover:text-primary">Webhooks</p>
                            <p className="text-xs text-muted-foreground mt-1">Async events by phase</p>
                        </Link>
                        <Link href="/developers/settlement" className="p-4 rounded-xl border hover:border-primary/40 group">
                            <p className="font-semibold group-hover:text-primary">Settlement & wallets</p>
                            <p className="text-xs text-muted-foreground mt-1">Balances, fees, reconciliation</p>
                        </Link>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
