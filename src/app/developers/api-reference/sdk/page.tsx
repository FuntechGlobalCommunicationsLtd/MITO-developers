"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SdkApiReferencePage() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">API Reference · Manage</p>
                    <h1 className="text-3xl font-extrabold tracking-tight mb-4">MITO Link SDK</h1>
                    <p className="text-base text-muted-foreground">
                        Install, configure, and launch the SDK. Server-side transaction creation:{" "}
                        <Link href="/developers/api-reference/retail-api#create-transaction" className="text-primary font-semibold hover:underline">
                            Retail create transaction
                        </Link>
                        .
                    </p>
                </div>

                <EndpointBlock
                    method="POST"
                    path="/api/v1/mito/Transactions"
                    title="Prerequisite: create transaction"
                    description="Call this from your backend before opening the SDK. Use the linkToken from the response in useMitoLink. Retail only — Biller partners use hosted checkout or Full API, not the SDK."
                    requestSamples={
                        <CodeTabs
                            tabs={[
                                {
                                    label: "Retail",
                                    language: "json",
                                    code: `POST /api/v1/mito/Transactions
{
  "sendAmount": 100,
  "sendCurrency": "USD",
  "serviceCode": "retail-payment",
  "receiveCountryIso3": "PHL",
  "sender": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}`,
                                },
                            ]}
                        />
                    }
                >
                    <p className="text-sm text-muted-foreground">
                        Full schema and parameters:{" "}
                        <Link href="/developers/api-reference/retail-api#create-transaction" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                            Retail API <ArrowRight className="w-3 h-3" />
                        </Link>
                    </p>
                </EndpointBlock>

                <EndpointBlock
                    method="POST"
                    path="@mito-money/mito-link"
                    title="Web & React Native SDK"
                    description="Install the package and initialize the checkout modal with the linkToken from your backend."
                    requestSamples={
                        <CodeTabs
                            height="450px"
                            tabs={[
                                {
                                    label: "Web (React)",
                                    language: "javascript",
                                    code: `npm install @mito-money/mito-link

import { useMitoLink } from '@mito-money/mito-link';

const MyComponent = () => {
  const { open } = useMitoLink({
    linkToken: 'from_your_backend',
    publishableKey: 'pk_test_...',
    environment: 'sandbox',
    linkType: 'retail-payment',
    onSuccess: (payload) => console.log('Success', payload),
    onExit: (error) => console.log('Exit', error),
  });

  return <button onClick={() => open()}>Pay with MITO</button>;
};`,
                                },
                                {
                                    label: "React Native",
                                    language: "javascript",
                                    code: `npm install @mito-money/mito-link-react-native \\
  react-native-webview react-native-safe-area-context

import { useMitoLink, MitoLinkHost } from '@mito-money/mito-link-react-native';

const Checkout = ({ linkToken }) => {
  const { open } = useMitoLink({
    linkToken,
    publishableKey: 'pk_test_...',
    linkType: 'retail-payment',
    environment: 'sandbox',
    onSuccess: (payload) => console.log('Success', payload),
  });

  return (
    <>
      <Button title="Open MITO" onPress={() => open()} />
      <MitoLinkHost />
    </>
  );
};`,
                                },
                            ]}
                        />
                    }
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 pr-4">Prop</th>
                                    <th className="py-2 pr-4">Type</th>
                                    <th className="py-2 pr-4">Required</th>
                                    <th className="py-2">Description</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold text-foreground">linkToken</td>
                                    <td className="py-3 font-mono">string</td>
                                    <td className="py-3 text-green-600 font-medium">Yes</td>
                                    <td className="py-3">Token from transaction initiation API.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold text-foreground">linkType</td>
                                    <td className="py-3 font-mono">string</td>
                                    <td className="py-3 text-green-600 font-medium">Yes</td>
                                    <td className="py-3"><code>retail-payment</code> or <code>retail-collection</code>.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold text-foreground">publishableKey</td>
                                    <td className="py-3 font-mono">string</td>
                                    <td className="py-3">No</td>
                                    <td className="py-3">Public key (<code>pk_</code> prefix).</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold text-foreground">environment</td>
                                    <td className="py-3 font-mono">string</td>
                                    <td className="py-3">No</td>
                                    <td className="py-3"><code>sandbox</code> or <code>production</code>.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold text-foreground">onSuccess</td>
                                    <td className="py-3 font-mono">function</td>
                                    <td className="py-3 text-green-600 font-medium">Yes</td>
                                    <td className="py-3">Called when checkout completes. Confirm via webhook before giving value.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold text-foreground">onExit</td>
                                    <td className="py-3 font-mono">function</td>
                                    <td className="py-3">No</td>
                                    <td className="py-3">Called when user exits or an error occurs.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </EndpointBlock>
            </div>
        </ApiReferenceLayout>
    );
}
