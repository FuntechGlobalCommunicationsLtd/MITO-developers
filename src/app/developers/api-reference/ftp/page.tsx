"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import Link from "next/link";

export default function FtpApiReferencePage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">API Reference · Process / Forex</p>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">MTO FTP file formats</h1>
                    <p className="text-xl text-muted-foreground">
                        SFTP file specifications for bulk MTO submissions. Integration flow:{" "}
                        <Link href="/developers/file-integration/mto-ftp" className="text-primary font-semibold hover:underline">
                            MTO FTP batch
                        </Link>
                    </p>
                </div>

                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h2 id="rules" className="text-lg font-bold mb-3">General file rules</h2>
                    <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                        <li>Strict <strong>.csv</strong> format, pipe-delimited (<code>|</code>)</li>
                        <li>No header row</li>
                        <li>Maximum 200 rows per file</li>
                        <li>Decimals explicit (e.g. <code>100.00</code>)</li>
                    </ul>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/Inbound"
                    title="Inbound transaction file"
                    description="Partners drop transaction batches here. MITO polls every ~15 minutes."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "CSV example",
                                    language: "csv",
                                    code: `1062|2024-05-15|14:30:00|EXT-123|1150.00|USD|50.00|NGN|57500.00|0|50.00|MONEYTRANSFER|BANKACCOUNT|...`,
                                },
                            ]}
                        />
                    }
                >
                    <p className="text-sm font-semibold">Naming: <code>FURPACCOUNTNOddMMyyyyHHmmss.csv</code></p>
                    <SchemaTable
                        fields={[
                            { name: "0. FurpAccountNo", type: "string", required: true, description: "MITO assigned account number." },
                            { name: "1. TransactionDate", type: "date", required: true, description: "yyyy-MM-dd." },
                            { name: "3. MTN", type: "string", required: true, description: "Money Transfer Number (internal ref)." },
                            { name: "5. SettlementCurrency", type: "string", required: true, description: "3-letter ISO code." },
                            { name: "6. SettlementAmount", type: "decimal", required: true, description: "Sending amount." },
                        ]}
                    />
                </EndpointBlock>

                <EndpointBlock
                    method="POST"
                    path="/Upload"
                    title="Document reference file"
                    description="Upload ID documents (JPG/PDF) with a CSV manifest linking them to transactions."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "CSV manifest",
                                    language: "csv",
                                    code: `1062|EXT-123|ID_FRONT|jpg\n1062|EXT-123|ID_BACK|jpg`,
                                },
                            ]}
                        />
                    }
                >
                    <p className="text-sm font-semibold">Naming: <code>DocumentddMMyyyyHHmmss.csv</code></p>
                    <SchemaTable
                        fields={[
                            { name: "0. FurpAccountNo", type: "string", required: true, description: "MITO account number." },
                            { name: "1. MTN", type: "string", required: true, description: "Money transfer number." },
                            { name: "2. DocumentNo", type: "string", required: true, description: "Matches physical file name." },
                            { name: "3. DocumentExt", type: "string", required: true, description: "e.g. jpg, pdf." },
                        ]}
                    />
                </EndpointBlock>

                <EndpointBlock
                    method="GET"
                    path="/Outbound"
                    title="Outbound data updates"
                    description="MITO deposits status updates, FX rates, and static reference data."
                    responseSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "Status CSV",
                                    language: "csv",
                                    code: `1062|2024-05-15|EXT-123|PROCESSED\n1062|2024-05-15|EXT-124|FAILED`,
                                },
                            ]}
                        />
                    }
                >
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="bg-muted p-4 rounded border">
                            <h3 className="font-bold text-foreground mb-2">Transaction status updates</h3>
                            <p className="mb-2"><strong>Name:</strong> <code>statusddMMyyyyHHmmss.csv</code></p>
                            <SchemaTable
                                fields={[
                                    { name: "3. MTN", type: "string", required: true, description: "Your original reference." },
                                    { name: "4. Status", type: "string", required: true, description: "INPROGRESS, PROCESSED, FAILED" },
                                ]}
                            />
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                            <li><code>StaticServiceProvider.csv</code> — banks and billers</li>
                            <li><code>rateddMMyyyyHHmmss.csv</code> — live FX rates</li>
                            <li><code>staticIdTypes.csv</code> — identification codes</li>
                        </ul>
                    </div>
                </EndpointBlock>
            </div>
        </ApiReferenceLayout>
    );
}
