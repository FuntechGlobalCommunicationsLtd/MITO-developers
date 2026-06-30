"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { StepFlow } from "@/components/developers/Flows";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LightbulbIcon, Terminal, Play, CheckCircle2, Copy, Shield, BookOpen } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GetStartedPage() {
    const [env, setEnv] = useState<"sandbox" | "live">("sandbox");
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const baseUrl = env === "sandbox" ? "https://api.sandbox.mito.money/v1" : "https://api.mito.money/v1";
    const apiKey = env === "sandbox" ? "sk_test_51Nx...8zL" : "sk_live_51Nx...9pR";

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSimulate = () => {
        setIsSimulating(true);
        setSimulatedResponse(null);
        setTimeout(() => {
            setSimulatedResponse(JSON.stringify({
                "success": true,
                "data": {
                    "base_currency": "GBP",
                    "target_currency": "KES",
                    "exchange_rate": 165.42,
                    "expires_at": new Date(Date.now() + 15 * 60000).toISOString()
                }
            }, null, 2));
            setIsSimulating(false);
        }, 1000);
    };

    return (
        <DocsLayout>
            <div className="max-w-4xl space-y-16 pb-16">
                {/* Header section with gradient flair */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-2xl blur opacity-10"></div>
                    <div className="relative bg-background border p-6 md:p-8 rounded-2xl shadow-sm">
                        <Terminal className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4" />
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Getting Started</h1>
                        <p className="text-lg md:text-xl text-muted-foreground">
                            Learn how to authenticate, explore our environments, and deploy your first integration with MITO&apos;s modern API.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            <Link href="#environments" className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted transition-colors group">
                                <div className="p-2 bg-primary/10 rounded-md text-primary opacity-80 group-hover:opacity-100 transition-opacity"><Shield className="w-4 h-4" /></div>
                                <span className="text-sm font-medium">Get API Keys</span>
                            </Link>
                            <Link href="#first-request" className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted transition-colors group">
                                <div className="p-2 bg-blue-500/10 rounded-md text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity"><Play className="w-4 h-4" /></div>
                                <span className="text-sm font-medium">Make a Request</span>
                            </Link>
                            <Link href="/developers/guides" className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted transition-colors group">
                                <div className="p-2 bg-green-500/10 rounded-md text-green-500 opacity-80 group-hover:opacity-100 transition-opacity"><BookOpen className="w-4 h-4" /></div>
                                <span className="text-sm font-medium">Pick integration model</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <section className="scroll-mt-24" id="journey">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm">1</span>
                        Integration Journey
                    </h2>
                    <div className="pl-0 md:pl-4">
                        <StepFlow
                            steps={[
                                {
                                    title: "Register as a Partner",
                                    description: "Sign your partnership agreement and receive your MITO Partner ID and dashboard access."
                                },
                                {
                                    title: "Get Credentials",
                                    description: "Log into the MITO dashboard to generate your API keys for the Sandbox environment."
                                },
                                {
                                    title: "Build & Test",
                                    description: "Integrate our APIs or Hosted Flows using Sandbox credentials. Simulate happy and unhappy paths."
                                },
                                {
                                    title: "Compliance Review",
                                    description: "MITO&apos;s compliance team will review your integration flow, especially concerning KYC/AML handling."
                                },
                                {
                                    title: "Go Live",
                                    description: "Swap to Live credentials, perform penny tests, and launch to your customers."
                                }
                            ]}
                        />
                    </div>
                </section>

                <section className="scroll-mt-24" id="environments">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm">2</span>
                        Environments & Keys
                    </h2>
                    <p className="text-muted-foreground mb-6 pl-0 md:pl-11">
                        MITO provides two distinct environments. Use the toggle below to switch your context.
                    </p>

                    <div className={cn(
                        "rounded-xl border shadow-sm overflow-hidden transition-all duration-300 ml-0 md:ml-11",
                        env === "sandbox" ? "border-muted" : "border-orange-200 shadow-orange-100"
                    )}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-muted/30 border-b gap-4">
                            <div>
                                <h3 className="font-semibold text-lg">Select Environment</h3>
                                <p className="text-sm text-muted-foreground">This updates the code snippets below.</p>
                            </div>
                            <Tabs value={env} onValueChange={(v) => setEnv(v as "sandbox" | "live")} className="w-[200px]">
                                <TabsList className="w-full grid grid-cols-2 border">
                                    <TabsTrigger value="sandbox" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sandbox</TabsTrigger>
                                    <TabsTrigger value="live" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Live</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Base URL</span>
                                    <div className="p-3 bg-muted rounded-md border font-mono text-sm break-all h-[46px] flex items-center">
                                        {baseUrl}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Your Secret Key</span>
                                    <div className="px-3 bg-muted rounded-md border font-mono text-sm flex items-center justify-between group h-[46px]">
                                        <span className={env === "live" ? "text-orange-600 dark:text-orange-400 font-bold" : "text-primary font-bold"}>
                                            {apiKey}
                                        </span>
                                        <Button variant="ghost" size="sm" className="h-7 px-2 opacity-50 group-hover:opacity-100" onClick={handleCopy}>
                                            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-24" id="authentication">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm">3</span>
                        Authentication
                    </h2>
                    <div className="pl-0 md:pl-11">
                        <p className="text-muted-foreground mb-6">
                            Authenticate your API requests by including your secret API key in the Authorization header.
                        </p>

                        <Alert className="mb-8 bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900 border text-blue-800 dark:text-blue-300">
                            <LightbulbIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <AlertTitle>Keep your keys safe</AlertTitle>
                            <AlertDescription>
                                Never share your secret keys or commit them to version control. Use environment variables.
                            </AlertDescription>
                        </Alert>

                        <h3 className="text-xl font-bold mb-4">Required Headers</h3>
                        <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground border-b">
                                    <tr>
                                        <th className="px-4 py-3 font-medium w-1/3">Header</th>
                                        <th className="px-4 py-3 font-medium">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr>
                                        <td className="px-4 py-4 font-mono text-primary">Content-Type</td>
                                        <td className="px-4 py-4 text-muted-foreground">Must be <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-medium">application/json</code> for POST/PUT/PATCH requests.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-4 font-mono text-primary">X-Mito-Idempotency-Key</td>
                                        <td className="px-4 py-4 text-muted-foreground">Required for all POST requests to prevent double-charging or duplicate transfers. Should be a unique UUID v4.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-4 font-mono text-primary">accessAffiliateNumber</td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            Partner account identification number (e.g. <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-medium">1049</code>).
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-4 font-mono text-primary">accessServiceNumber</td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            Corridor service identification number (e.g. <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-medium">21028</code>).
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-24" id="authorization">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm">4</span>
                        Authorization
                    </h2>
                    <div className="pl-0 md:pl-11">
                        <p className="text-muted-foreground mb-6">
                            For corridors utilizing MTO partner integrations, configure your request tool with the following Basic Authentication credentials:
                        </p>

                        <div className="overflow-x-auto rounded-lg border bg-card shadow-sm mb-6 max-w-2xl">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-muted/50 text-muted-foreground border-b">
                                    <tr>
                                        <th className="px-4 py-3 font-medium w-1/3">Parameter</th>
                                        <th className="px-4 py-3 font-medium">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr>
                                        <td className="px-4 py-4 font-mono text-primary">Auth Type</td>
                                        <td className="px-4 py-4 text-muted-foreground font-semibold">Basic Auth</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-4 font-mono text-primary">Username</td>
                                        <td className="px-4 py-4 text-muted-foreground font-mono font-semibold">Transfast</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-4 font-mono text-primary">Password</td>
                                        <td className="px-4 py-4 text-muted-foreground font-mono flex items-center justify-between gap-4">
                                            <span className="truncate max-w-[200px] sm:max-w-none">{showPassword ? "transfast_secret_sandbox_key_2026" : "••••••••••••••••••••"}</span>
                                            <button
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-primary hover:underline text-xs font-semibold shrink-0"
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                            The authorization header will be automatically generated when you send the request. Learn more about <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic_authentication" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Basic Auth</a> authorization.
                        </p>
                    </div>
                </section>

                <section className="scroll-mt-24" id="errors">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        Errors
                    </h2>
                    <div className="pl-0 md:pl-11">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left Column: Description */}
                            <div className="lg:col-span-5 space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    MITO uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the <code className="bg-muted dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-xs text-foreground font-semibold">2xx</code> range indicate success. Codes in the <code className="bg-muted dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-xs text-foreground font-semibold">4xx</code> range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the <code className="bg-muted dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-xs text-foreground font-semibold">5xx</code> range indicate an error with MITO&apos;s servers (these are rare).
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Some <code className="bg-muted dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-xs text-foreground font-semibold">4xx</code> errors that could be handled programmatically (e.g., a card is <Link href="#" className="text-primary hover:underline font-semibold">declined</Link>) include an <Link href="#" className="text-primary hover:underline font-semibold">error code</Link> that briefly explains the error reported.
                                </p>
                            </div>

                            {/* Right Column: Status Code Summary */}
                            <div className="lg:col-span-7 rounded-xl border bg-card/30 dark:bg-zinc-950/20 shadow-sm overflow-hidden border-border/80">
                                <div className="bg-muted/50 dark:bg-zinc-900/50 px-6 py-4 border-b border-border/80 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    HTTP Status Code Summary
                                </div>
                                <div className="p-6 overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <tbody>
                                            {[
                                                { code: "200", status: "OK", desc: "Everything worked as expected." },
                                                { code: "400", status: "Bad Request", desc: "The request was unacceptable, often due to missing a required parameter." },
                                                { code: "401", status: "Unauthorized", desc: "No valid API key provided." },
                                                { code: "402", status: "Request Failed", desc: "The parameters were valid but the request failed." },
                                                { code: "403", status: "Forbidden", desc: "The API key doesn't have permissions to perform the request." },
                                                { code: "404", status: "Not Found", desc: "The requested resource doesn't exist." }
                                            ].map((item, idx) => (
                                                <tr key={idx} className="align-top hover:bg-muted/10 transition-colors">
                                                    <td className="py-2.5 pr-4 font-mono font-bold text-foreground w-12">{item.code}</td>
                                                    <td className="py-2.5 pr-4 font-semibold text-foreground/85 w-32">{item.status}</td>
                                                    <td className="py-2.5 text-muted-foreground text-xs leading-relaxed">{item.desc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="scroll-mt-24" id="first-request">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm">5</span>
                        Your First Request
                    </h2>
                    <div className="pl-0 md:pl-11">
                        <p className="text-muted-foreground mb-6">
                            Verify your credentials with a rate lookup. Full request/response specs:{" "}
                            <Link href="/developers/api-reference/process-forex#exchange-rates" className="text-primary font-semibold hover:underline">
                                GET /exchange/rates
                            </Link>
                        </p>

                        <div className="flex flex-col lg:flex-row bg-card border shadow-sm rounded-xl overflow-hidden mb-8">
                            {/* Left: Request Code */}
                            <div className="p-5 border-b lg:border-b-0 lg:border-r lg:w-[50%] shrink-0">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-sm flex items-center gap-2">
                                        <Terminal className="w-4 h-4 text-muted-foreground" />
                                        Request Code
                                    </h3>
                                </div>
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "cURL",
                                            language: "bash",
                                            code: `curl -X GET "${baseUrl}/fx/rates?base=GBP&target=KES" \\
  -H "Authorization: Bearer ${apiKey}"`
                                        },
                                        {
                                            label: "Node.js",
                                            language: "javascript",
                                            code: `const fetch = require('node-fetch');

const response = await fetch('${baseUrl}/fx/rates?base=GBP&target=KES', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  }
});

const data = await response.json();
console.log(data);`
                                        },
                                        {
                                            label: "Python",
                                            language: "python",
                                            code: `import requests

url = "${baseUrl}/fx/rates"
headers = {
    "Authorization": "Bearer ${apiKey}"
}
params = {
    "base": "GBP",
    "target": "KES"
}

response = requests.get(url, headers=headers, params=params)
print(response.json())`
                                        }
                                    ]}
                                />
                                <div className="mt-4">
                                    <Button
                                        onClick={handleSimulate}
                                        disabled={isSimulating}
                                        className="w-full shadow-sm"
                                    >
                                        {isSimulating ? (
                                            <><span className="animate-spin mr-2">⟳</span> Contacting MITO...</>
                                        ) : (
                                            <><Play className="w-4 h-4 mr-2" /> Simulate Request</>
                                        )}
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center mt-3">
                                        * Interactive simulator returns mock Sandbox data
                                    </p>
                                </div>
                            </div>

                            {/* Right: Response Output */}
                            <div className="p-5 bg-zinc-950 text-zinc-50 flex flex-col lg:flex-1 min-h-[400px] lg:min-h-0">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-sm flex items-center gap-2 text-zinc-300">
                                        Response Output
                                    </h3>
                                    {simulatedResponse && (
                                        <span className="text-xs font-mono bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                                            200 OK
                                        </span>
                                    )}
                                </div>
                                <div className={cn(
                                    "flex-1 w-full font-mono text-sm overflow-auto relative transition-opacity duration-300",
                                    isSimulating ? "opacity-40" : "opacity-100"
                                )}>
                                    {simulatedResponse ? (
                                        <pre className="p-1">
                                            <code className="language-json" dangerouslySetInnerHTML={{
                                                __html: simulatedResponse.replace(
                                                    /("success": true)/,
                                                    '<span class="text-green-400">$1</span>'
                                                ).replace(
                                                    /"([a-z_]+)"(?=:)/g,
                                                    '<span class="text-blue-300">"$1"</span>'
                                                ).replace(
                                                    /: ([0-9.]+)/g,
                                                    ': <span class="text-orange-300">$1</span>'
                                                ).replace(
                                                    /: (".*?")/g,
                                                    ': <span class="text-green-300">$1</span>'
                                                )
                                            }} />
                                        </pre>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                                                <Play className="w-5 h-5 text-zinc-600" />
                                            </div>
                                            <p className="text-zinc-500 max-w-[200px] leading-relaxed">
                                                Click <strong className="text-zinc-300 font-medium">Simulate Request</strong> to see the live Sandbox API response format.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
