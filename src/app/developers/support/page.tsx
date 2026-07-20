"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
export default function SupportPage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">Support & Go-Live</h1>
                <p className="text-base text-muted-foreground mb-12">
                    Reach out to our Integration Engineering team for technical assistance or to schedule your Production Go-Live review.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <Mail className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Technical Integration Support</CardTitle>
                            <CardDescription>Email our engineers directly for API queries.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <a href="mailto:api-support@mito.money" className="text-primary font-medium hover:underline">api-support@mito.money</a>
                            <p className="text-sm text-muted-foreground mt-2">SLA: 4 hours (Business Days)</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Phone className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Urgent Production Issues</CardTitle>
                            <CardDescription>24/7 hotline for live partners only.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <a href="tel:+448001234567" className="text-primary font-medium hover:underline">+44 800 123 4567</a>
                            <p className="text-sm text-muted-foreground mt-2">Have your Partner ID ready.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DocsLayout>
    );
}
