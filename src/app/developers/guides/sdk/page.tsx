"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { CodeBlock, CodeTabs } from "@/components/developers/CodeBlocks";
import { Info } from "lucide-react";

export default function SDKIntegrationGuidePage() {
    return (
        <DocsLayout>
            <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">SDK Integration Guide</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    The MITO Link SDK is the fastest way to integrate MITO&apos;s payment and transfer capabilities into your application with a native-feel checkout experience.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3 mb-12">
                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        The SDK handles secure data collection, 3D Secure authentication, and KYC document uploads, reducing your PCI compliance burden and development time.
                    </p>
                </div>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">1. Server-Side Initiation</h2>
                    <p className="text-muted-foreground mb-4">
                        Before launching the SDK, your backend must create a transaction to obtain a <code>linkToken</code>. This token identifies the session and ensures security.
                    </p>
                    <CodeBlock 
                        code={`POST /api/v1/transactions
{
  "sendAmount": 100,
  "sendCurrency": "USD",
  "serviceCode": "retail-payment", // or bill-payment, retail-collection
  "receiveCountryIso3": "PHL",
  "sender": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}`} 
                        language="json" 
                    />
                    <p className="text-sm text-muted-foreground mt-4 italic">
                        Store the <code>linkToken</code> from the response to pass it to your frontend.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">2. Choose Your Platform</h2>
                    
                    <CodeTabs 
                        height="450px"
                        tabs={[
                            {
                                label: "Web (React)",
                                language: "bash",
                                code: `# Install
npm install @mito-money/mito-link

# Usage
import { useMitoLink } from '@mito-money/mito-link';

const MyComponent = () => {
  const { open } = useMitoLink({
    linkToken: 'abc123encryptedtoken...',
    publishableKey: 'pk_test_...',
    environment: 'sandbox', // or 'production'
    linkType: 'retail-payment',
    onSuccess: (payload) => console.log('Success!', payload),
    onExit: (error) => console.log('Exit', error),
  });

  return <button onClick={() => open()}>Pay with MITO</button>;
};`
                            },
                            {
                                label: "React Native",
                                language: "bash",
                                code: `# Install
npm install @mito-money/mito-link-react-native react-native-webview react-native-safe-area-context

# Usage
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
};`
                            }
                        ]}
                    />
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Configuration Options</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 pr-4">Prop</th>
                                    <th className="py-2 pr-4">Type</th>
                                    <th className="py-2 pr-4 font-semibold">Required</th>
                                    <th className="py-2">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold">linkToken</td>
                                    <td className="py-3 text-blue-500 font-mono">string</td>
                                    <td className="py-3 text-green-600 font-medium">Yes</td>
                                    <td className="py-3">The token received from the transaction initiation API.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold">linkType</td>
                                    <td className="py-3 text-blue-500 font-mono">string</td>
                                    <td className="py-3 text-green-600 font-medium">Yes</td>
                                    <td className="py-3">Enum: <code>&quot;bill-payment&quot;</code>, <code>&quot;retail-payment&quot;</code>, or <code>&quot;retail-collection&quot;</code>.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold">publishableKey</td>
                                    <td className="py-3 text-blue-500 font-mono">string</td>
                                    <td className="py-3 text-muted-foreground">No</td>
                                    <td className="py-3">Your public API key (starts with <code>pk_</code>).</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold">environment</td>
                                    <td className="py-3 text-blue-500 font-mono">string</td>
                                    <td className="py-3 text-muted-foreground">No</td>
                                    <td className="py-3">Enum: <code>&quot;production&quot;</code> or <code>&quot;sandbox&quot;</code>. Defaults to <code>&quot;production&quot;</code>.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold">onSuccess</td>
                                    <td className="py-3 text-blue-500 font-mono">function</td>
                                    <td className="py-3 text-green-600 font-medium">Yes</td>
                                    <td className="py-3">Callback executed when a checkout is completed successfully. Receives transaction reference payload.</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 font-mono font-semibold">onExit</td>
                                    <td className="py-3 text-blue-500 font-mono">function</td>
                                    <td className="py-3 text-muted-foreground">No</td>
                                    <td className="py-3">Callback executed when the user exits the checkout session or an error occurs.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
