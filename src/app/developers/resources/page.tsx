"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

const downloads = [
    {
        title: "OpenAPI — MTO",
        description: "OpenAPI specification for MTO gateway endpoints.",
        href: "/mto-swagger.yml",
        filename: "mto-swagger.yml",
    },
    {
        title: "Postman — MTO API",
        description: "MTO REST and FTP gateway collection.",
        href: "/mto-api.postman_collection.json",
        filename: "mto-api.postman_collection.json",
    },
    {
        title: "Postman — Retail API",
        description: "Retail affiliate API collection with sandbox variables.",
        href: "/retail-api.postman_collection.json",
        filename: "retail-api.postman_collection.json",
    },
    {
        title: "Postman — Biller API",
        description: "Biller collection, payout, and refund endpoints.",
        href: "/biller-api.postman_collection.json",
        filename: "biller-api.postman_collection.json",
    },
];

export default function ResourcesPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Resources</p>
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">Tools & downloads</h1>
                <p className="text-base text-muted-foreground mb-12">
                    OpenAPI specs, Postman collections, and SDK packages. Endpoint details live in{" "}
                    <Link href="/developers/api-reference" className="text-primary font-semibold hover:underline">
                        API Reference
                    </Link>
                    .
                </p>

                <section className="mb-12">
                    <div className="grid md:grid-cols-2 gap-6">
                        {downloads.map((item) => (
                            <Card key={item.href} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" className="w-full" asChild>
                                        <a href={item.href} download={item.filename}>
                                            <Download className="mr-2 h-4 w-4" /> Download
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">SDK packages</h2>
                    <p className="text-muted-foreground mb-4">
                        Install and usage docs:{" "}
                        <Link href="/developers/api-reference/sdk" className="text-primary font-semibold hover:underline">
                            SDK API reference
                        </Link>
                    </p>
                    <div className="font-mono text-sm bg-muted/50 border rounded-lg p-4 space-y-1">
                        <div>npm install @mito-money/mito-link</div>
                        <div>npm install @mito-money/mito-link-react-native</div>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
