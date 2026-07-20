import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StepFlow({ steps }: { steps: { title: string; description: string | ReactNode }[] }) {
    return (
        <div className="space-y-8 my-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {steps.map((step, index) => (
                <div key={index} className="relative flex items-start justify-center md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline Marker */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                        {index + 1}
                    </div>

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-8 md:group-even:pl-8">
                        <div className="p-5 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                            <div className="text-muted-foreground leading-relaxed text-sm">
                                {step.description}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FlowDiagram({
    title,
    description,
    children,
    compact = true,
}: {
    title?: string;
    description?: string;
    children: ReactNode;
    /** Compact layout (default). Pass compact={false} for the large diagram. */
    compact?: boolean;
}) {
    return (
        <div className={cn("border rounded-xl overflow-hidden bg-card", compact ? "my-4" : "my-10")}>
            {(title || description) && (
                <div className={cn("border-b bg-muted/20", compact ? "px-4 py-2.5" : "p-6")}>
                    {title && (
                        <h3 className={cn("font-bold", compact ? "text-sm" : "text-xl mb-2")}>{title}</h3>
                    )}
                    {description && (
                        <p className={cn("text-muted-foreground", compact && "text-xs mt-0.5")}>{description}</p>
                    )}
                </div>
            )}
            <div
                className={cn(
                    "flex items-center justify-center bg-background relative overflow-hidden",
                    compact ? "px-4 py-5 min-h-0" : "p-8 min-h-[300px]"
                )}
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className={cn("relative z-10 w-full", compact ? "max-w-2xl" : "max-w-3xl")}>{children}</div>
            </div>
        </div>
    );
}

export function FlowNode({
    label,
    sublabel,
    type = "default",
    className,
    compact = true,
}: {
    label: string;
    sublabel?: string;
    type?: "default" | "primary" | "secondary" | "user" | "MITO";
    className?: string;
    compact?: boolean;
}) {
    const typeStyles = {
        default: "bg-background border-border text-foreground",
        primary: "bg-primary/10 border-primary/30 text-primary",
        secondary: "bg-secondary text-secondary-foreground border-border",
        user: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300",
        MITO: "bg-primary border-primary text-primary-foreground shadow-md",
    };

    return (
        <div
            className={cn(
                "rounded-lg border-2 text-center shadow-sm shrink-0 font-medium transition-all hover:shadow-md",
                compact ? "px-3 py-2 w-[132px] text-sm" : "px-6 py-4 w-[180px]",
                typeStyles[type] || typeStyles.default,
                className
            )}
        >
            {label}
            {sublabel && (
                <div className={cn("opacity-80 font-normal", compact ? "text-[10px] mt-0.5 leading-tight" : "text-xs mt-1")}>
                    {sublabel}
                </div>
            )}
        </div>
    );
}

export function FlowArrow({
    label,
    direction = "right",
    className,
    compact = true,
}: {
    label?: string;
    direction?: "right" | "left" | "down" | "up" | "both";
    className?: string;
    compact?: boolean;
}) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center shrink-0 px-1",
                compact ? "min-w-[48px]" : "min-w-[100px] px-2",
                className
            )}
        >
            {label && (
                <span
                    className={cn(
                        "text-muted-foreground font-medium text-center bg-background px-1",
                        compact ? "text-[10px] mb-0.5" : "text-xs mb-1 px-2"
                    )}
                >
                    {label}
                </span>
            )}
            <div className="relative w-full h-0.5 bg-border/80">
                {(direction === "right" || direction === "both") && (
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-border/80 rotate-45 transform origin-center" />
                )}
                {(direction === "left" || direction === "both") && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 border-b-2 border-l-2 border-border/80 rotate-45 transform origin-center" />
                )}
            </div>
        </div>
    );
}
