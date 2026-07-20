"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqPage() {
    return (
        <DocsLayout>
            <div className="max-w-3xl">
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h1>
                <p className="text-base text-muted-foreground mb-12">
                    Quick answers to the most common integration and API questions.
                </p>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left text-lg font-semibold">What is the difference between Sandbox and Live?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base">
                            The Sandbox environment simulates our real API but connects to mock banking rails. No real money moves, and test cards/accounts work automatically. The Live environment processes actual financial transactions and requires strict KYC/AML checks.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-left text-lg font-semibold">How long does a Quote lock an FX rate?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base">
                            When you call <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">POST /v1/transfers/quote</code>, the exchange rate is guaranteed for exactly 15 minutes. If you execute the transfer within that window using the <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">quote_id</code>, you will receive the exact rate specified, regardless of market fluctuations.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-left text-lg font-semibold">What happens if a webhook delivery fails?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base">
                            If your server does not respond with a <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">2xx</code> status within 5 seconds, MITO will retry delivery 5 times with exponential backoff over a 24-hour period. You can also manually query the event history via the API.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-left text-lg font-semibold">Are there limits in the Sandbox?</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base">
                            Yes, Sandbox accounts are limited to 1,000 requests per minute. There are also hardcoded simulated limits for transaction amounts (e.g., transfers over £1,000,000 will simulate a compliance hold).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </DocsLayout>
    );
}
