"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import Link from "next/link";

export default function HostedApiReferencePage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">API Reference · Collect</p>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Hosted checkout</h1>
                    <p className="text-xl text-muted-foreground">
                        Retail hosted pages use <code className="bg-muted px-1 rounded text-base">POST /transactions</code> with{" "}
                        <code className="bg-muted px-1 rounded text-base">channel: HOSTEDPAGE</code>. Biller hosted uses{" "}
                        <Link href="/developers/api-reference/biller-api#api-v2-Business-InitiateTransactions" className="text-primary font-semibold hover:underline">
                            InitiateTransactions
                        </Link>{" "}
                        redirectUrl. Flow:{" "}
                        <Link href="/developers/hosted-flows" className="text-primary font-semibold hover:underline">Hosted checkout guide</Link>
                    </p>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/transactions"
                    title="Initiate transaction (Retail — hosted page)"
                    description="Validate rate via POST /exchange/rates first to obtain rateId. Returns PaymentUrl for customer redirect or SDK linkToken flow."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "Hosted page",
                                    language: "json",
                                    code: `{
  "serviceCode": "MONEYTRANSFER",
  "collectionMode": "BANKACCOUNT",
  "PartnerReferenceNumber": "ORD-2026-001",
  "userId": "2c4a230c-5085-4924-a3e1-25fb4fc5965b",
  "sendCountryIso3": "GBR",
  "receiveCountryIso3": "NGA",
  "sendCurrency": "GBP",
  "receiveCurrency": "NGN",
  "sendAmount": 100,
  "rateId": "dc6263b0-e8fb-4144-a111-53fde6c86836",
  "channel": "HOSTEDPAGE",
  "redirectUrl": "https://yoursite.com/return",
  "webhookUrl": "https://yoursite.com/webhooks/mito"
}`,
                                },
                            ]}
                        />
                    }
                    responseSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "200",
                                    language: "json",
                                    code: `{
  "data": {
    "retailTransactionId": "038846ff-b96c-4051-a6ae-30b35f1e7f73",
    "partnerReferenceNumber": "ORD-2026-001",
    "status": "PROCESSED",
    "PaymentUrl": "https://checkout.mito.money/pay?journeyCode=..."
  },
  "code": 200
}`,
                                },
                            ]}
                        />
                    }
                >
                    <SchemaTable
                        fields={[
                            { name: "rateId", type: "string", required: true, description: "From POST /exchange/rates validation." },
                            { name: "channel", type: "string", required: true, description: "HOSTEDPAGE for redirect checkout." },
                            { name: "redirectUrl", type: "string", required: true, description: "Return URL after success/cancel/failure." },
                            { name: "webhookUrl", type: "string", required: false, description: "HTTPS endpoint for status POST callbacks." },
                        ]}
                    />
                    <p className="text-sm text-muted-foreground mt-4">
                        Full schema:{" "}
                        <Link href="/developers/api-reference/retail-api#transactions" className="text-primary font-semibold hover:underline">
                            Retail API — POST /transactions
                        </Link>
                    </p>
                </EndpointBlock>
            </div>
        </ApiReferenceLayout>
    );
}
