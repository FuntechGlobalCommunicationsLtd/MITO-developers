import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function HeroSection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children?: ReactNode;
}) {
    return (
        <div className="relative overflow-hidden bg-background py-16 sm:py-24 mb-12 border-b">
            <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
                    {title}
                </h1>
                <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
                    {description}
                </p>
                {children && <div className="mt-10 flex justify-center gap-4">{children}</div>}
            </div>
        </div>
    );
}

export function CapabilityCard({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: ReactNode;
}) {
    return (
        <Card className="transition-all hover:shadow-md border-border/50 bg-card">
            <CardHeader className="pb-4">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}

export function IntegrationTypeCard({
    title,
    description,
    href,
}: {
    title: string;
    description: string;
    href: string;
}) {
    return (
        <a
            href={href}
            className="block p-4 rounded-xl border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
        >
            <p className="font-semibold text-sm group-hover:text-primary inline-flex items-center gap-1">
                {title}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </a>
    );
}
