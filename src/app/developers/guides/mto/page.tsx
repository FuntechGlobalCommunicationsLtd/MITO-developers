"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Link from "next/link";
import { FlowDiagram, FlowNode, FlowArrow } from "@/components/developers/Flows";
import { DocsPage, DocsPageHeader, DocsInlineCode, DocsTable } from "@/components/developers/DocsPage";
import {
    GuideIntro,
    GuideWorkflow,
    GuideOptionsChooser,
    GuideOptionDetail,
    GuideApisInvolved,
    GuideRelatedHelpers,
} from "@/components/developers/PartnerGuideBlocks";
import type { GuideApiEntry } from "@/components/developers/IntegrationGuide";

const MTO_APIS: GuideApiEntry[] = [
    { method: "GET", path: "/Mto/GetRate", title: "Get exchange rate", href: "/developers/api-reference/mto-api#get-rate" },
    { method: "GET", path: "/Mto/types", title: "Retrieve types", href: "/developers/api-reference/mto-api#get-types" },
    { method: "GET", path: "/Mto/GetProviders", title: "Get providers", href: "/developers/api-reference/mto-api#get-types" },
    { method: "POST", path: "/Mto/BankAccountValidate", title: "Validate bank account", href: "/developers/api-reference/mto-api#validate-bank" },
    { method: "POST", path: "/Mto/TransactionCreate", title: "Initiate transaction", href: "/developers/api-reference/mto-api#create-transaction" },
    { method: "GET", path: "/Mto/GetTransaction", title: "Get transaction details", href: "/developers/api-reference/mto-api#get-transaction" },
];

export default function MtoGuidePage() {
    return (
        <DocsLayout>
            <DocsPage>
                <section id="overview" className="space-y-8">
                    <DocsPageHeader
                        eyebrow="Integration methods · MTO"
                        title="MTO partner integration"
                        description="MTO Business Gateway: remittance payout via REST or FTP."
                    />

                    <GuideIntro
                        covers={[
                            "Overall partner workflow (quote → submit → status)",
                            "REST API and FTP Gateway options",
                            "Basic Auth and the /Mto/* endpoints you call",
                        ]}
                    >
                        <p>
                            For FGC MTO partners that use MITO for remittance payout. You own the customer experience;
                            MITO receives the transfer instruction and pays out to the beneficiary.
                        </p>
                        <p>
                            Endpoint schemas:{" "}
                            <Link href="/developers/api-reference/mto-api" className="text-primary font-semibold hover:underline">
                                MTO API reference
                            </Link>
                            .
                        </p>
                    </GuideIntro>

                    <GuideWorkflow
                        description="Same shape for REST and FTP. Channel differs; quote → submit → status does not."
                        diagram={
                            <FlowDiagram title="MTO partner contract" compact>
                                <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-3">
                                    <FlowNode label="Authenticate" sublabel="Basic Auth" type="user" compact />
                                    <FlowArrow direction="right" label="Headers" compact />
                                    <FlowNode label="Quote" sublabel="GetRate · types" type="secondary" compact />
                                    <FlowArrow direction="right" label="Rate" compact />
                                    <FlowNode label="Submit" sublabel="TransactionCreate" type="MITO" compact />
                                    <FlowArrow direction="right" label="MTN" compact />
                                    <FlowNode label="Confirm" sublabel="GetTransaction" type="primary" compact />
                                </div>
                            </FlowDiagram>
                        }
                        steps={[
                            <>Authenticate (Basic Auth + AccessAffiliateNumber).</>,
                            <>Quote with GetRate / types / GetProviders as needed.</>,
                            <>Submit via TransactionCreate or FTP Inbound.</>,
                            <>Confirm with GetTransaction (or FTP Outbound status).</>,
                        ]}
                    />

                    <GuideOptionsChooser
                        description="Two channels from the classic MTO gateway. Pick one."
                        options={[
                            {
                                href: "#mto-api",
                                title: "REST API",
                                description: "/Mto/* web methods — Basic Auth.",
                            },
                            {
                                href: "#mto-ftp",
                                title: "FTP Gateway",
                                description: "Inbound / Upload / Outbound folders over SFTP.",
                            },
                        ]}
                        footnote="Prerequisites: MTO partner contract, API username/password, AccessAffiliateNumber, funded account."
                    />

                    <div id="api-contract" className="space-y-6 scroll-mt-24">
                        <div>
                            <h2 className="text-xl font-bold">API contract</h2>
                            <p className="text-muted-foreground mt-2">
                                All REST calls use the <DocsInlineCode>/Mto/*</DocsInlineCode> paths under the MTO Business
                                Gateway. Full request/response schemas:{" "}
                                <Link href="/developers/api-reference/mto-api" className="text-primary font-semibold hover:underline">
                                    MTO API reference
                                </Link>
                                .
                            </p>
                        </div>

                        <div id="authentication" className="space-y-4 scroll-mt-24">
                            <h3 className="text-lg font-bold">Authentication (Basic Auth)</h3>
                            <p className="text-muted-foreground text-sm">
                                Encode <DocsInlineCode>username:password</DocsInlineCode> as Base64 and send Basic Auth.
                                Also send your affiliate number header.
                            </p>
                            <DocsTable
                                headers={["Header", "Value"]}
                                rows={[
                                    [
                                        <span className="font-mono text-primary text-xs">Authorization</span>,
                                        <span className="text-muted-foreground">Basic &lt;base64(username:password)&gt;</span>,
                                    ],
                                    [
                                        <span className="font-mono text-primary text-xs">AccessAffiliateNumber</span>,
                                        <span className="text-muted-foreground">Your affiliate number (e.g. 1062)</span>,
                                    ],
                                    [
                                        <span className="font-mono text-primary text-xs">AccessServiceNumber</span>,
                                        <span className="text-muted-foreground">Service number when issued</span>,
                                    ],
                                ]}
                            />
                        </div>
                    </div>
                </section>

                <GuideOptionDetail
                    id="mto-api"
                    title="1) REST API"
                    overview={
                        <>
                            Classic MTO web methods: rates and lookups, optional bank validation,{" "}
                            <DocsInlineCode>POST /Mto/TransactionCreate</DocsInlineCode>, then{" "}
                            <DocsInlineCode>GET /Mto/GetTransaction</DocsInlineCode> by MTN.
                        </>
                    }
                    diagram={
                        <FlowDiagram title="MTO REST" compact>
                            <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-3">
                                <FlowNode label="Quote" sublabel="GetRate" type="secondary" compact />
                                <FlowArrow direction="right" label="Create" compact />
                                <FlowNode label="TransactionCreate" sublabel="POST /Mto/…" type="MITO" compact />
                                <FlowArrow direction="right" label="MTN" compact />
                                <FlowNode label="GetTransaction" sublabel="Status" type="primary" compact />
                            </div>
                        </FlowDiagram>
                    }
                    sequence={[
                        <><DocsInlineCode>GET /Mto/GetRate</DocsInlineCode> · types / GetProviders</>,
                        <><DocsInlineCode>POST /Mto/TransactionCreate</DocsInlineCode></>,
                        <><DocsInlineCode>GET /Mto/GetTransaction</DocsInlineCode></>,
                    ]}
                    partnerNotes={[
                        <>Use a unique MTN per transfer.</>,
                        <>Keep Basic Auth credentials server-side only.</>,
                    ]}
                    mitoNotes={[
                        <>Accept create and process payout.</>,
                        <>Return status on GetTransaction.</>,
                    ]}
                />

                <GuideOptionDetail
                    id="mto-ftp"
                    title="2) FTP Gateway"
                    overview="Exchange pipe-delimited CSV over SFTP. Partner provides host, username, and password. Three folders: Inbound (transactions), Upload (documents), Outbound (status, rates, static data)."
                    diagram={
                        <FlowDiagram title="MTO FTP" compact>
                            <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-y-3">
                                <FlowNode label="Inbound" sublabel="Transaction CSV" type="user" compact />
                                <FlowArrow direction="right" label="SFTP" compact />
                                <FlowNode label="MITO" sublabel="Gateway" type="MITO" compact />
                                <FlowArrow direction="right" label="Outbox" compact />
                                <FlowNode label="Outbound" sublabel="Status · rates" type="primary" compact />
                            </div>
                        </FlowDiagram>
                    }
                    sequence={[
                        <>Ensure Inbound, Upload, and Outbound folders exist.</>,
                        <>Drop transaction CSV in Inbound (max 200 rows, pipe-delimited, no header).</>,
                        <>Optional: document reference + files in Upload.</>,
                        <>
                            Pull status, rates, and static files from Outbound. Details:{" "}
                            <Link href="/developers/file-integration/mto-ftp" className="text-primary font-semibold hover:underline">
                                FTP batch guide
                            </Link>
                            {" · "}
                            <Link href="/developers/api-reference/ftp" className="text-primary font-semibold hover:underline">
                                FTP file formats
                            </Link>
                            .
                        </>,
                    ]}
                    partnerNotes={[
                        <>Follow naming rules (e.g. FURPACCOUNTNOddMMyyyyHHmmss.csv).</>,
                        <>Reconcile Outbound status files.</>,
                    ]}
                    mitoNotes={[
                        <>Poll Inbound and publish Outbound updates.</>,
                    ]}
                />

                <GuideApisInvolved
                    apiRefHref="/developers/api-reference/mto-api"
                    apiRefLabel="MTO API reference"
                    flat={MTO_APIS}
                />

                <GuideRelatedHelpers
                    items={[
                        { href: "/developers/api-reference/mto-api", title: "MTO API reference", description: "Classic /Mto/* samples" },
                        { href: "/developers/file-integration/mto-ftp", title: "FTP batch", description: "Folder & file flow" },
                        { href: "/developers/api-reference/ftp", title: "FTP formats", description: "CSV column specs" },
                    ]}
                />
            </DocsPage>
        </DocsLayout>
    );
}
