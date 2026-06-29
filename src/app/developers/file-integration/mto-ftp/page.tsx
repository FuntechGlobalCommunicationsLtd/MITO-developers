"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { IntegrationGuide } from "@/components/developers/IntegrationGuide";
import { FlowNode, FlowArrow } from "@/components/developers/Flows";

export default function MtoFtpGuidePage() {
    return (
        <DocsLayout>
            <IntegrationGuide
                content={{
                    title: "MTO FTP batch",
                    partnerLabel: "Integration method · FTP · MTO partner",
                    description:
                        "Submit bulk remittance transactions via pipe-delimited CSV files over SFTP. MITO polls inbound files, processes transfers, and drops status files in outbound.",
                    prerequisites: [
                        "MTO partner contract with FTP/SFTP credentials.",
                        "Provisioned /Inbound, /Upload, and /Outbound directories.",
                        "Pre-funded operational wallet.",
                        "File format compliance (CSV, pipe-delimited, no header row, max 200 rows).",
                    ],
                    integrationMethods: [
                        { label: "MTO REST flow", href: "/developers/guides/mto", description: "Real-time API alternative." },
                        { label: "FTP file specifications", href: "/developers/api-reference/ftp", description: "Inbound, upload, and outbound file formats." },
                        { label: "File integration overview", href: "/developers/file-integration", description: "General SFTP folder model." },
                    ],
                    diagramTitle: "FTP batch cycle",
                    diagram: (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                            <FlowNode label="Your system" sublabel="Drop CSV" type="user" />
                            <FlowArrow direction="right" label="/Inbound" />
                            <FlowNode label="MITO" sublabel="Process batch" type="MITO" />
                            <FlowArrow direction="right" label="/Outbound" />
                            <FlowNode label="Your system" sublabel="Status files" type="secondary" />
                        </div>
                    ),
                    phases: {
                        collect: [
                            {
                                title: "Prepare transaction file",
                                description: "Build pipe-delimited CSV with sender, beneficiary, amounts, and corridor data. Drop in /Inbound.",
                                apiLinks: [{ label: "Inbound file spec", href: "/developers/api-reference/ftp#Inbound" }],
                            },
                            {
                                title: "Upload compliance documents (if required)",
                                description: "Place JPG/PDF files in /Upload with a matching manifest CSV.",
                                apiLinks: [{ label: "Upload manifest spec", href: "/developers/api-reference/ftp#Upload" }],
                            },
                        ],
                        processForex: [
                            {
                                title: "MITO polls and processes",
                                description: "MITO ingests files every ~15 minutes, applies FX routing, and executes transfers.",
                            },
                            {
                                title: "Retrieve rates and static data",
                                description: "FX rates and provider lists are published to /Outbound.",
                                apiLinks: [{ label: "Outbound files", href: "/developers/api-reference/ftp#Outbound" }],
                            },
                        ],
                        disburse: [
                            {
                                title: "Read status updates",
                                description: "Poll /Outbound for statusddMMyyyyHHmmss.csv files. Map MTN references to PROCESSED or FAILED.",
                                apiLinks: [{ label: "Status file spec", href: "/developers/api-reference/ftp#Outbound" }],
                            },
                        ],
                    },
                    webhookEvents: [],
                    statusFlow: ["received", "inprogress", "processed", "failed"],
                    credentialsService: "mto",
                    apisInvolved: [
                        { method: "POST", path: "/Inbound/*.csv", title: "Transaction batch file", href: "/developers/api-reference/ftp#Inbound" },
                        { method: "POST", path: "/Upload/*.csv", title: "Document manifest", href: "/developers/api-reference/ftp#Upload" },
                        { method: "GET", path: "/Outbound/status*.csv", title: "Status updates", href: "/developers/api-reference/ftp#Outbound" },
                    ],
                }}
            />
        </DocsLayout>
    );
}
