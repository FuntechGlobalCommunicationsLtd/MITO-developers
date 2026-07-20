"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";

export default function ChangelogPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">Changelog</h1>
                <p className="text-base text-muted-foreground mb-12">
                    Recent updates to the MITO APIs and Developer Tools.
                </p>

                <div className="space-y-12 relative border-l-2 border-border ml-3 pl-8">

                    <div className="relative">
                        <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background"></span>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">API Version 1.2 Released</h3>
                            <span className="text-muted-foreground text-sm font-mono mt-1 sm:mt-0">March 4, 2026</span>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                            <ul>
                                <li><strong>Feature:</strong> Added new <code className="bg-muted px-1 py-0.5 rounded text-xs text-foreground">compliance.case.pending_review</code> webhook event.</li>
                                <li><strong>Fix:</strong> Corrected an issue where the FX endpoint returned 400 for valid 6-decimal rate strings in specific Asian corridors.</li>
                                <li><strong>Deprecation:</strong> The legacy <code className="bg-muted px-1 py-0.5 rounded text-xs text-foreground">/v1/collections/validate</code> endpoint is now marked deprecated and will be removed in v2. Please use STK push webhooks instead.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground ring-4 ring-background"></span>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">Idempotency Keys Enforced</h3>
                            <span className="text-muted-foreground text-sm font-mono mt-1 sm:mt-0">February 12, 2026</span>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                            <p>
                                As part of our commitment to platform stability, the <code className="bg-muted px-1 py-0.5 rounded text-xs text-foreground">X-Mito-Idempotency-Key</code> header is now strictly enforced for all POST mutating endpoints. Failing to supply this header will result in a 400 Bad Request error.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </DocsLayout>
    );
}
