import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { FlowDiagram } from "@/components/developers/Flows";
import { DocsPage, DocsPageHeader, DocsSection, DocsLinkCard, DocsLinkGrid } from "@/components/developers/DocsPage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface GuideStep {
    title: string;
    description: ReactNode;
    apiLinks?: { label: string; href: string }[];
    webhookLinks?: { label: string; href: string }[];
}

export interface GuideApiEntry {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    title: string;
    href: string;
}

export interface GuideApiGroup {
    id?: string;
    title: string;
    description?: string;
    apis: GuideApiEntry[];
}

export interface GuideAuthContent {
    summary: string;
    headers: { name: string; value: string }[];
    docsHref?: string;
}

export interface IntegrationGuideContent {
    title: string;
    partnerLabel: string;
    description: string;
    /** Shown in Overview for each workflow (Retail / Biller / MTO) */
    authentication?: GuideAuthContent;
    prerequisites: string[];
    integrationMethods: { label: string; href: string; description: string }[];
    diagramTitle?: string;
    diagram?: ReactNode | null;
    phases: {
        collect: GuideStep[];
        processForex: GuideStep[];
        disburse: GuideStep[];
    };
    /** Flat list — used when apiGroups is not provided */
    apisInvolved?: GuideApiEntry[];
    /** Grouped lists (e.g. Workflow / Helper). Takes precedence over apisInvolved. */
    apiGroups?: GuideApiGroup[];
    webhookEvents?: { name: string; href: string; when: string }[];
    statusFlow?: string[];
    credentialsService?: "mto" | "retail" | "biller";
    goLiveHref?: string;
}

function StepList({ steps }: { steps: GuideStep[] }) {
    if (steps.length === 0) {
        return <p className="text-sm text-muted-foreground italic">Not applicable for this integration path.</p>;
    }

    return (
        <ol className="space-y-4">
            {steps.map((step, i) => (
                <li key={i} className="rounded-lg border bg-card p-4">
                    <h4 className="font-semibold text-sm mb-1.5">{step.title}</h4>
                    <div className="text-sm text-muted-foreground leading-relaxed">{step.description}</div>
                    {(step.apiLinks?.length || step.webhookLinks?.length) ? (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {step.apiLinks?.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {step.webhookLinks?.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </li>
            ))}
        </ol>
    );
}

const methodColors: Record<GuideApiEntry["method"], string> = {
    GET: "bg-blue-500/10 text-blue-700",
    POST: "bg-green-500/10 text-green-700",
    PUT: "bg-yellow-500/10 text-yellow-700",
    PATCH: "bg-orange-500/10 text-orange-700",
    DELETE: "bg-red-500/10 text-red-700",
};

export function ApiEntryList({ apis }: { apis: GuideApiEntry[] }) {
    return (
        <div className="divide-y border rounded-xl overflow-hidden">
            {apis.map((api) => (
                <Link
                    key={api.href + api.path}
                    href={api.href}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 hover:bg-muted/40 transition-colors group"
                >
                    <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                        <Badge variant="secondary" className={cn("text-[10px]", methodColors[api.method])}>
                            {api.method}
                        </Badge>
                        <span className="text-muted-foreground">{api.path}</span>
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary flex-1">{api.title}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 hidden sm:block" />
                </Link>
            ))}
        </div>
    );
}

export function IntegrationGuide({ content }: { content: IntegrationGuideContent }) {
    const credentialsHref = "/developers/get-started#environments";

    const hasApiGroups = Boolean(content.apiGroups?.length);
    const hasFlatApis = Boolean(content.apisInvolved?.length);
    const showApis = hasApiGroups || hasFlatApis;

    return (
        <DocsPage>
            <section id="overview" className="space-y-8">
                <DocsPageHeader
                    eyebrow={content.partnerLabel}
                    title={content.title}
                    description={content.description}
                />

                {content.authentication && (
                    <div id="authentication" className="scroll-mt-24 space-y-3">
                        <h2 className="text-xl font-bold">
                            {content.credentialsService === "biller"
                                ? "Authentication (Basic Auth)"
                                : content.credentialsService === "retail"
                                    ? "Authentication (JWT)"
                                    : "Authentication"}
                        </h2>
                        <p className="text-sm text-muted-foreground">{content.authentication.summary}</p>
                        <div className="overflow-x-auto rounded-xl border">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground border-b">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Header</th>
                                        <th className="px-4 py-3 font-medium">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {content.authentication.headers.map((h) => (
                                        <tr key={h.name}>
                                            <td className="px-4 py-3 font-mono text-primary">{h.name}</td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{h.value}</code>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {content.authentication.docsHref && (
                            <p className="text-sm text-muted-foreground">
                                Details:{" "}
                                <Link href={content.authentication.docsHref} className="text-primary font-semibold hover:underline">
                                    Authentication docs
                                </Link>
                            </p>
                        )}
                    </div>
                )}

            </section>

            <DocsSection id="integration-methods" title="Integration methods">
                <DocsLinkGrid>
                    {content.integrationMethods.map((m) => (
                        <DocsLinkCard
                            key={m.href + m.label}
                            href={m.href}
                            title={m.label}
                            description={m.description}
                        />
                    ))}
                </DocsLinkGrid>
            </DocsSection>

            <DocsSection id="prerequisites" title="Prerequisites">
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {content.prerequisites.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </DocsSection>

            {content.diagram && content.diagramTitle && (
                <DocsSection id="architecture" title="Architecture">
                    <FlowDiagram title={content.diagramTitle} compact>
                        {content.diagram}
                    </FlowDiagram>
                </DocsSection>
            )}

            <section id="integration-flow" className="scroll-mt-24 space-y-8">
                <h2 className="text-xl font-bold">Integration flow</h2>

                <div>
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                        Collect
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 ml-9">Accept payment from the customer or fund the transaction.</p>
                    <div className="ml-9">
                        <StepList steps={content.phases.collect} />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                        Process / Forex
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 ml-9">FX quoting, compliance, routing, and async processing.</p>
                    <div className="ml-9">
                        <StepList steps={content.phases.processForex} />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                        Disburse
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 ml-9">Payout to beneficiary or settlement to your bank account.</p>
                    <div className="ml-9">
                        <StepList steps={content.phases.disburse} />
                    </div>
                </div>
            </section>

            {content.webhookEvents && content.webhookEvents.length > 0 && (
                <DocsSection
                    id="webhooks"
                    title="Webhooks"
                    description={
                        <>
                            Confirm final status server-side via webhook before releasing goods or marking a transfer
                            complete.{" "}
                            <Link href="/developers/webhooks" className="text-primary font-semibold hover:underline">
                                Webhook documentation
                            </Link>
                        </>
                    }
                >
                    <div className="divide-y border rounded-xl overflow-hidden">
                        {content.webhookEvents.map((event) => (
                            <Link
                                key={event.name}
                                href={event.href}
                                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-4 hover:bg-muted/40 transition-colors"
                            >
                                <code className="text-xs font-semibold text-primary shrink-0">{event.name}</code>
                                <span className="text-sm text-muted-foreground">{event.when}</span>
                            </Link>
                        ))}
                    </div>
                </DocsSection>
            )}

            {content.statusFlow && content.statusFlow.length > 0 && (
                <DocsSection id="status-lifecycle" title="Status lifecycle">
                    <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
                        {content.statusFlow.map((status, i) => (
                            <span key={status} className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-md bg-muted">{status}</span>
                                {i < content.statusFlow!.length - 1 && (
                                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                            </span>
                        ))}
                    </div>
                </DocsSection>
            )}

            {showApis && (
                <DocsSection
                    id="apis-involved"
                    title="APIs involved"
                    description="Click an endpoint to open its full request/response spec in the partner API reference."
                >
                    {hasApiGroups ? (
                        <div className="space-y-8">
                            {content.apiGroups!.map((group) => (
                                <div key={group.id ?? group.title} id={group.id} className="scroll-mt-24 space-y-3">
                                    <div>
                                        <h3 className="text-lg font-semibold">{group.title}</h3>
                                        {group.description && (
                                            <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                                        )}
                                    </div>
                                    <ApiEntryList apis={group.apis} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ApiEntryList apis={content.apisInvolved ?? []} />
                    )}
                </DocsSection>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button asChild variant="outline" className="rounded-full">
                    <Link href={credentialsHref}>Environments & credentials</Link>
                </Button>
                <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white">
                    <Link href={content.goLiveHref ?? "/developers/support"}>
                        Go-live checklist <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </DocsPage>
    );
}
