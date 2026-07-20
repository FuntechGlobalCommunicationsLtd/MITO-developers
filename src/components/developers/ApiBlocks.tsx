import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const methodColors: Record<HttpMethod, string> = {
    GET: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-500/20",
    POST: "bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-500/20",
    PUT: "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 hover:bg-yellow-500/20",
    PATCH: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 hover:bg-orange-500/20",
    DELETE: "bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500/20",
};

export function StatusBadge({ status }: { status: "Live" | "Sandbox" | "Beta" | "Deprecated" }) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "font-medium border shadow-sm",
                status === "Live" && "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900",
                status === "Sandbox" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900",
                status === "Beta" && "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900",
                status === "Deprecated" && "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
            )}
        >
            {status}
        </Badge>
    );
}

export function EndpointBlock({
    method,
    path,
    title,
    description,
    status = "Live",
    children,
    requestSamples,
    responseSamples,
    exampleResponse // Legacy prop
}: {
    method: HttpMethod;
    path: string;
    title: string;
    description: string;
    status?: "Live" | "Sandbox" | "Beta" | "Deprecated";
    children?: ReactNode;
    requestSamples?: ReactNode;
    responseSamples?: ReactNode;
    exampleResponse?: ReactNode;
}) {
    const id = path.replace(/\//g, "-").replace(/^-/, "");
    const finalResponseSamples = responseSamples || exampleResponse;

    return (
        <div className="flex flex-col lg:flex-row border-b last:border-0" id={id}>
            {/* Middle Column: Documentation */}
            <div className="flex-1 min-w-0 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                    <StatusBadge status={status} />
                </div>

                <p className="text-muted-foreground mb-6 text-lg">{description}</p>

                <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border font-mono text-sm mb-8 overflow-x-auto">
                    <Badge variant="secondary" className={cn("text-xs px-2 py-0.5", methodColors[method])}>
                        {method}
                    </Badge>
                    <span className="text-foreground">{path}</span>
                </div>

                <div className="space-y-6">
                    {children}
                </div>
            </div>

            {/* Right Column: Samples */}
            <div className="lg:w-[45%] lg:min-w-[450px] bg-[#0f172a] dark:bg-slate-900/50 p-6 lg:p-8 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto border-l border-slate-800">
                <div className="space-y-8">
                    {/* Request Samples Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Request Samples
                            </h3>
                            <div className="flex items-center gap-2 min-w-0">
                                <Badge variant="outline" className="text-[10px] uppercase border-slate-700 text-slate-400 shrink-0">
                                    {method}
                                </Badge>
                                <code className="text-[10px] text-slate-300 truncate">{path}</code>
                            </div>
                        </div>
                        {requestSamples || (
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                <p className="text-xs text-slate-500 italic">No specific request parameters required for this endpoint.</p>
                            </div>
                        )}
                    </div>

                    {/* Response Samples Section */}
                    {finalResponseSamples && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Responses
                                </h3>
                            </div>
                            {finalResponseSamples}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
