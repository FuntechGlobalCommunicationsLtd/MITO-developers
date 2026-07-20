import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Standard content column for all DocsLayout pages */
export function DocsPage({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("max-w-4xl space-y-8 pb-16", className)}>{children}</div>;
}

export function DocsPageHeader({
    eyebrow,
    title,
    description,
    children,
}: {
    eyebrow?: string;
    title: string;
    description?: ReactNode;
    children?: ReactNode;
}) {
    return (
        <div>
            {eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{eyebrow}</p>
            )}
            <h1 className="text-3xl font-extrabold tracking-tight mb-3">{title}</h1>
            {description && <p className="text-base text-muted-foreground">{description}</p>}
            {children}
        </div>
    );
}

export function DocsSection({
    id,
    title,
    description,
    children,
    className,
}: {
    id?: string;
    title: string;
    description?: ReactNode;
    children?: ReactNode;
    className?: string;
}) {
    return (
        <section id={id} className={cn("scroll-mt-24 space-y-4", className)}>
            <div className="space-y-2">
                <h2 className="text-xl font-bold">{title}</h2>
                {description && <div className="text-muted-foreground">{description}</div>}
            </div>
            {children}
        </section>
    );
}

export function DocsSubSection({
    id,
    title,
    children,
}: {
    id?: string;
    title: string;
    children?: ReactNode;
}) {
    return (
        <div id={id} className="scroll-mt-24 space-y-3">
            <h3 className="text-lg font-semibold">{title}</h3>
            {children}
        </div>
    );
}

export function DocsInlineCode({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm font-mono", className)}>
            {children}
        </code>
    );
}

export function DocsCallout({ title, children }: { title?: string; children: ReactNode }) {
    return (
        <div className="rounded-xl border bg-muted/20 p-5 space-y-3">
            {title && <h3 className="font-semibold text-sm">{title}</h3>}
            <div className="text-sm text-muted-foreground space-y-2">{children}</div>
        </div>
    );
}

export function DocsLinkCard({
    href,
    title,
    description,
}: {
    href: string;
    title: string;
    description?: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col h-full p-5 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
        >
            <p className="font-semibold text-sm group-hover:text-primary inline-flex items-center gap-1">
                {title}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
            {description && <p className="text-xs text-muted-foreground mt-1 flex-1">{description}</p>}
        </Link>
    );
}

export function DocsLinkGrid({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
    return (
        <div
            className={cn(
                "grid gap-3 items-stretch",
                cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            )}
        >
            {children}
        </div>
    );
}

/** Full-width chooser card — use for Integration methods + Helper methods lists */
export function DocsTopicCard({
    href,
    title,
    description,
    options,
}: {
    href: string;
    title: string;
    description: string;
    options?: { title: string; href: string }[];
}) {
    return (
        <div className="rounded-xl border p-5 hover:border-primary/40 hover:bg-primary/5 transition-colors h-full">
            <Link href={href} className="group block space-y-1">
                <h3 className="text-lg font-bold group-hover:text-primary">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </Link>
            {options && options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {options.map((opt) => (
                        <Link
                            key={opt.href}
                            href={opt.href}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                            {opt.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export function DocsTopicStack({ children }: { children: ReactNode }) {
    return <div className="space-y-3">{children}</div>;
}

export function DocsTable({
    headers,
    rows,
}: {
    headers: string[];
    rows: ReactNode[][];
}) {
    return (
        <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground border-b">
                    <tr>
                        {headers.map((h) => (
                            <th key={h} className="px-4 py-3 font-medium">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-3 align-top">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function DocsBulletList({ items }: { items: ReactNode[] }) {
    return (
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    );
}

export function DocsNumberedList({ items }: { items: ReactNode[] }) {
    return (
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ol>
    );
}

export function DocsStepCard({
    step,
    title,
    children,
}: {
    step?: number | string;
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="border-l-4 border-primary pl-6 space-y-1">
            <h3 className="font-bold">
                {step != null ? `${step}. ${title}` : title}
            </h3>
            <div className="text-sm text-muted-foreground">{children}</div>
        </div>
    );
}

export function DocsInfoCard({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-xl border p-5 space-y-2">
            <h3 className="font-semibold">{title}</h3>
            <div className="text-sm text-muted-foreground space-y-2">{children}</div>
        </div>
    );
}
