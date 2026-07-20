"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlowNode, FlowArrow, FlowDiagram } from "@/components/developers/Flows";

export default function FileIntegrationPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Integration method · File / SFTP</p>
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">File integration overview</h1>
                <p className="text-base text-muted-foreground mb-8">
                    For high-volume or legacy systems, MITO supports secure SFTP file exchange instead of real-time REST APIs.
                </p>

                <section className="mb-12">
                    <h2 id="when-to-use" className="text-xl font-bold mb-4">When to use file integration</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>MTO partners submitting bulk transactions (hundreds per batch)</li>
                        <li>Backend systems that cannot maintain persistent API connections</li>
                        <li>Scheduled reconciliation and status polling via outbound files</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 id="folder-structure" className="text-xl font-bold mb-6">Folder structure</h2>
                    <FlowDiagram title="SFTP directories">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <FlowNode label="/inbox or /Inbound" sublabel="You → MITO" type="user" />
                            <FlowArrow direction="right" label="Process" />
                            <FlowNode label="MITO engine" type="MITO" />
                            <FlowArrow direction="right" label="Results" />
                            <FlowNode label="/outbox or /Outbound" sublabel="MITO → You" type="secondary" />
                        </div>
                    </FlowDiagram>
                    <div className="mt-6 bg-muted/40 border rounded-xl p-6 font-mono text-sm space-y-2">
                        <div><span className="text-green-600 font-semibold">/inbound</span> — drop transfer request files</div>
                        <div><span className="text-blue-600 font-semibold">/upload</span> — compliance documents + manifest</div>
                        <div><span className="text-primary font-semibold">/outbound</span> — status, rates, static data</div>
                        <div><span className="text-red-600 font-semibold">/error</span> — structurally invalid files</div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 id="documentation" className="text-xl font-bold mb-4">Documentation</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link href="/developers/file-integration/mto-ftp" className="p-5 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group">
                            <p className="font-semibold group-hover:text-primary">MTO FTP batch flow</p>
                            <p className="text-sm text-muted-foreground mt-1">Collect → Process / Forex → Disburse via SFTP</p>
                        </Link>
                        <Link href="/developers/api-reference/ftp" className="p-5 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group">
                            <p className="font-semibold group-hover:text-primary">FTP file specifications</p>
                            <p className="text-sm text-muted-foreground mt-1">Inbound, upload, and outbound formats</p>
                        </Link>
                    </div>
                </section>

                <section>
                    <h2 id="related" className="text-xl font-bold mb-4">Related</h2>
                    <Link href="/developers/guides/mto" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                        MTO partner integration (REST) <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>
            </div>
        </DocsLayout>
    );
}
