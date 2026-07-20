import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocsCallout, DocsInlineCode, DocsLinkCard, DocsLinkGrid } from "@/components/developers/DocsPage";
import { ApiEntryList, type GuideApiEntry, type GuideApiGroup } from "@/components/developers/IntegrationGuide";

export function GuideIntro({
    id = "introduction",
    children,
    covers,
}: {
    id?: string;
    children: ReactNode;
    covers: string[];
}) {
    return (
        <div id={id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-bold">Introduction</h2>
            <div className="space-y-3 text-muted-foreground">{children}</div>
            <DocsCallout title="What this documentation covers">
                <ul className="list-disc pl-5 space-y-1">
                    {covers.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </DocsCallout>
        </div>
    );
}

export function GuideWorkflow({
    id = "overall-workflow",
    description,
    diagram,
    steps,
}: {
    id?: string;
    description: ReactNode;
    diagram: ReactNode;
    steps: ReactNode[];
}) {
    return (
        <div id={id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-bold">Overall workflow</h2>
            <p className="text-muted-foreground">{description}</p>
            {diagram}
            <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                {steps.map((step, i) => (
                    <li key={i}>{step}</li>
                ))}
            </ol>
        </div>
    );
}

export function GuideOptionsChooser({
    id = "integration-options",
    title = "Integration options",
    description,
    options,
    footnote,
}: {
    id?: string;
    title?: string;
    description: ReactNode;
    options: { href: string; title: string; description: string }[];
    footnote?: ReactNode;
}) {
    return (
        <div id={id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
            <div className="grid sm:grid-cols-2 gap-3">
                {options.map((opt) => (
                    <Link
                        key={opt.href}
                        href={opt.href}
                        className="flex flex-col h-full p-4 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                    >
                        <p className="font-semibold text-sm group-hover:text-primary inline-flex items-center gap-1">
                            {opt.title}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                    </Link>
                ))}
            </div>
            {footnote && <p className="text-sm text-muted-foreground">{footnote}</p>}
        </div>
    );
}

export function GuideOptionDetail({
    id,
    title,
    overview,
    diagram,
    sequence,
    partnerNotes,
    mitoNotes,
}: {
    id: string;
    title: string;
    overview: ReactNode;
    /** Omit on helper pages — full diagrams belong on integration guides. */
    diagram?: ReactNode;
    sequence?: ReactNode[];
    partnerNotes?: ReactNode[];
    mitoNotes?: ReactNode[];
}) {
    const hasNotes = (partnerNotes?.length ?? 0) > 0 || (mitoNotes?.length ?? 0) > 0;

    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-bold">{title}</h2>

            <div id={`${id}-overview`} className="space-y-2">
                <h3 className="text-lg font-semibold">Overview</h3>
                <div className="text-sm text-muted-foreground space-y-2">{overview}</div>
            </div>

            {diagram && (
                <div id={`${id}-diagram`}>
                    <h3 className="text-lg font-semibold mb-3">Workflow Diagram</h3>
                    {diagram}
                </div>
            )}

            {sequence && sequence.length > 0 && (
                <div id={`${id}-sequence`} className="space-y-2">
                    <h3 className="text-lg font-semibold">API Sequence</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                        {sequence.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>
            )}

            {hasNotes && (
                <div id={`${id}-notes`} className="grid md:grid-cols-2 gap-4">
                    {(partnerNotes?.length ?? 0) > 0 && (
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">Partner responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {partnerNotes!.map((n, i) => (
                                    <li key={i}>{n}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {(mitoNotes?.length ?? 0) > 0 && (
                        <div className="rounded-lg border p-4">
                            <h4 className="font-semibold mb-2">MITO responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {mitoNotes!.map((n, i) => (
                                    <li key={i}>{n}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}

export function GuideApisInvolved({
    id = "apis-involved",
    apiRefHref,
    apiRefLabel,
    groups,
    flat,
}: {
    id?: string;
    apiRefHref: string;
    apiRefLabel: string;
    groups?: GuideApiGroup[];
    flat?: GuideApiEntry[];
}) {
    return (
        <section id={id} className="space-y-4">
            <div>
                <h2 className="text-xl font-bold mb-2">APIs involved</h2>
                <p className="text-sm text-muted-foreground">
                    Click an endpoint to open its full request/response spec in the{" "}
                    <Link href={apiRefHref} className="text-primary font-semibold hover:underline">
                        {apiRefLabel}
                    </Link>
                    .
                </p>
            </div>
            {groups?.map((group) => (
                <div key={group.id ?? group.title} id={group.id} className="space-y-3">
                    <div>
                        <h3 className="text-lg font-bold">{group.title}</h3>
                        {group.description && (
                            <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                        )}
                    </div>
                    <ApiEntryList apis={group.apis} />
                </div>
            ))}
            {flat && flat.length > 0 && <ApiEntryList apis={flat} />}
        </section>
    );
}

export function GuideRelatedHelpers({ items }: { items: { href: string; title: string; description: string }[] }) {
    return (
        <section id="related-helpers" className="space-y-4">
            <h2 className="text-xl font-bold">Related helper methods</h2>
            <DocsLinkGrid>
                {items.map((item) => (
                    <DocsLinkCard key={item.href} href={item.href} title={item.title} description={item.description} />
                ))}
            </DocsLinkGrid>
        </section>
    );
}

export { DocsInlineCode };
