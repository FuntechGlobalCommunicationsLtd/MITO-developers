import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { FlowDiagram } from "@/components/developers/Flows";
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

export interface IntegrationGuideContent {
    title: string;
    partnerLabel: string;
    description: string;
    prerequisites: string[];
    integrationMethods: { label: string; href: string; description: string }[];
    diagramTitle?: string;
    diagram?: ReactNode | null;
    phases: {
        collect: GuideStep[];
        processForex: GuideStep[];
        disburse: GuideStep[];
    };
    apisInvolved: GuideApiEntry[];
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

export function IntegrationGuide({ content }: { content: IntegrationGuideContent }) {
    const credentialsHref = content.credentialsService
        ? `/developers/credentials?service=${content.credentialsService}`
        : "/developers/credentials";

    return (
        <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{content.partnerLabel}</p>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">{content.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{content.description}</p>

            {/* Integration methods */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Integration methods</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                    {content.integrationMethods.map((m) => (
                        <Link
                            key={m.href + m.label}
                            href={m.href}
                            className="p-4 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                        >
                            <p className="font-semibold text-sm group-hover:text-primary">{m.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Prerequisites */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {content.prerequisites.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </section>

            {/* Architecture */}
            {content.diagram && content.diagramTitle && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Architecture</h2>
                    <FlowDiagram title={content.diagramTitle}>{content.diagram}</FlowDiagram>
                </section>
            )}

            {/* Three phases */}
            <section className="mb-12 space-y-10">
                <h2 className="text-2xl font-bold">Integration flow</h2>

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

            {/* Webhooks */}
            {content.webhookEvents && content.webhookEvents.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Webhooks</h2>
                    <p className="text-muted-foreground text-sm mb-4">
                        Confirm final status server-side via webhook before releasing goods or marking a transfer complete.{" "}
                        <Link href="/developers/webhooks" className="text-primary font-semibold hover:underline">
                            Webhook documentation
                        </Link>
                    </p>
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
                </section>
            )}

            {/* Status lifecycle */}
            {content.statusFlow && content.statusFlow.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Status lifecycle</h2>
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
                </section>
            )}

            {/* APIs involved */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-2">APIs involved</h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Full request/response specs live in{" "}
                    <Link href="/developers/api-reference" className="text-primary font-semibold hover:underline">
                        API Reference
                    </Link>
                    .
                </p>
                <div className="divide-y border rounded-xl overflow-hidden">
                    {content.apisInvolved.map((api) => (
                        <Link
                            key={api.href}
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
            </section>

            {/* Footer CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button asChild variant="outline" className="rounded-full">
                    <Link href={credentialsHref}>View credentials</Link>
                </Button>
                <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white">
                    <Link href={content.goLiveHref ?? "/developers/support"}>
                        Go-live checklist <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
