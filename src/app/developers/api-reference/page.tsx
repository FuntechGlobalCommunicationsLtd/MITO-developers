"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationTypeCard } from "@/components/developers/HeroCards";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PARTNER_API_PAGES } from "@/lib/api-endpoints";

export default function ApiReferenceLandingPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">API Reference</h1>
                <p className="text-base text-muted-foreground mb-4">
                    Full request/response specs by partner, plus Hosted, SDK, and FTP formats.
                </p>
                <p className="text-muted-foreground mb-12">
                    Integration flows:{" "}
                    <Link href="/developers/guides" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                        Documentation <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </p>

                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-6">Full partner references</h2>
                    <div className="space-y-4">
                        {Object.entries(PARTNER_API_PAGES).map(([key, p]) => (
                            <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border rounded-xl">
                                <div>
                                    <Link href={p.href} className="font-semibold hover:text-primary">{p.title}</Link>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Redoc:{" "}
                                        <a href={p.external} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                            {p.external.replace("https://", "")}
                                        </a>
                                    </p>
                                </div>
                                <Link href={p.href} className="text-sm text-primary font-medium hover:underline shrink-0">
                                    Open →
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-6">Channels & formats</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <IntegrationTypeCard
                            title="Hosted checkout"
                            description="POST /api/v1/mito/Transactions (HOSTEDPAGE)."
                            href="/developers/api-reference/hosted"
                        />
                        <IntegrationTypeCard
                            title="SDK"
                            description="MITO Link install and config."
                            href="/developers/api-reference/sdk"
                        />
                        <IntegrationTypeCard
                            title="FTP file formats"
                            description="MTO batch CSV specs."
                            href="/developers/api-reference/ftp"
                        />
                        <IntegrationTypeCard
                            title="Manage"
                            description="Webhook signature verification."
                            href="/developers/api-reference/manage"
                        />
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
