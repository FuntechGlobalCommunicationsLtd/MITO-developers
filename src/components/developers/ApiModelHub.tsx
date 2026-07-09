import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const methodColors: Record<HttpMethod, string> = {
    GET: "bg-blue-500/10 text-blue-700",
    POST: "bg-green-500/10 text-green-700",
    PUT: "bg-yellow-500/10 text-yellow-700",
    PATCH: "bg-orange-500/10 text-orange-700",
    DELETE: "bg-red-500/10 text-red-700",
};

export interface ApiEndpointEntry {
    method: HttpMethod;
    path: string;
    title: string;
    description: string;
    href: string;
}

export function ApiModelHub({
    title,
    description,
    phase,
    endpoints,
    relatedDocs,
}: {
    title: string;
    description: string;
    phase: string;
    endpoints: ApiEndpointEntry[];
    relatedDocs?: { title: string; href: string; description: string }[];
}) {
    return (
        <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{phase}</p>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground mb-10">{description}</p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                    Canonical API reference grouped by capability. The same endpoint may appear in multiple integration flows.
                </p>
                <div className="divide-y border rounded-xl overflow-hidden">
                    {endpoints.map((ep) => (
                        <Link
                            key={ep.href}
                            href={ep.href}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 hover:bg-muted/40 transition-colors group"
                        >
                            <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                                <Badge variant="secondary" className={cn("text-[10px]", methodColors[ep.method])}>
                                    {ep.method}
                                </Badge>
                                <span className="text-muted-foreground truncate max-w-[220px] sm:max-w-none">{ep.path}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm group-hover:text-primary transition-colors">{ep.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{ep.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 hidden sm:block" />
                        </Link>
                    ))}
                </div>
            </section>

            {relatedDocs && relatedDocs.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Related integration flows</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {relatedDocs.map((doc) => (
                            <Link
                                key={doc.href}
                                href={doc.href}
                                className="p-4 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                            >
                                <p className="font-semibold text-sm group-hover:text-primary">{doc.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
