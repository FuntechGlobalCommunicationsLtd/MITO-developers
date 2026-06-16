"use client";

import { useState, useEffect } from "react";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    Key,
    Copy,
    Check,
    Eye,
    EyeOff,
    ShieldAlert,
    CheckCircle2,
    Lock,
    Unlock,
    Server,
    ExternalLink,
    AlertCircle,
    Info,
    CheckCircle,
    Play
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CredentialsPage() {
    const [activeTab, setActiveTab] = useState<"staging" | "live">("staging");
    const [showStagingPass, setShowStagingPass] = useState(false);
    const [showLivePass, setShowLivePass] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [liveGenerated, setLiveGenerated] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<"mto" | "retail" | "biller">("mto");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const service = params.get("service");
            if (service === "mto" || service === "retail" || service === "biller") {
                setSelectedService(service);
            }
        }
    }, []);

    // Service Credentials Data
    const credentialsData = {
        mto: {
            staging: {
                baseUrl: "https://furp02-staging.funtechcom.com",
                serviceNumber: "1014",
                affiliateNumber: "21050",
                username: "Omnex_MTO",
                password: "5ySk2H7lDi9U6yKa3P6yUc_MTO"
            },
            live: {
                baseUrl: "https://connect.funtechcom.com",
                serviceNumber: "1014",
                affiliateNumber: "21050",
                username: "Omnex_MTO_Live",
                password: "5ySk2H7lDi9U6yKa3P6yUc_MTO_Prod"
            }
        },
        retail: {
            staging: {
                baseUrl: "https://furp02-staging.funtechcom.com",
                serviceNumber: "1015",
                affiliateNumber: "21050",
                username: "Omnex_Retail",
                password: "5ySk2H7lDi9U6yKa3P6yUc_Retail"
            },
            live: {
                baseUrl: "https://connect.funtechcom.com",
                serviceNumber: "1015",
                affiliateNumber: "21050",
                username: "Omnex_Retail_Live",
                password: "5ySk2H7lDi9U6yKa3P6yUc_Retail_Prod"
            }
        },
        biller: {
            staging: {
                baseUrl: "https://furp02-pre-pord.funtechcom.com",
                serviceNumber: "1016",
                affiliateNumber: "21050",
                username: "Omnex_Biller",
                password: "5ySk2H7lDi9U6yKa3P6yUc_Biller"
            },
            live: {
                baseUrl: "https://connect.funtechcom.com",
                serviceNumber: "1016",
                affiliateNumber: "21050",
                username: "Omnex_Biller_Live",
                password: "5ySk2H7lDi9U6yKa3P6yUc_Biller_Prod"
            }
        }
    };

    const requestPaths = {
        mto: "/Mto/TransactionCreate",
        retail: "/api/v1/transactions",
        biller: "/api/v2/Business/InitiateTransactions"
    };

    const stagingCreds = credentialsData[selectedService].staging;
    const liveCreds = credentialsData[selectedService].live;

    // Base64 encodings for authorization headers
    const stagingBase64 = typeof window !== "undefined" ? btoa(`${stagingCreds.username}:${stagingCreds.password}`) : "";
    const liveBase64 = typeof window !== "undefined" ? btoa(`${liveCreds.username}:${liveCreds.password}`) : "";

    const getCurlCommand = (creds: typeof stagingCreds, base64: string, isLive: boolean) => {
        const path = requestPaths[selectedService];
        if (selectedService === "retail") {
            const secKey = isLive ? "sk_live_xyz789" : "sk_test_xyz789";
            return `curl -X POST "${creds.baseUrl}${path}" \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer eyJhbGciOi..." \\\n  -H "Mito-Secret-Key: ${secKey}"`;
        }
        return `curl -X POST "${creds.baseUrl}${path}" \\\n  -H "Content-Type: application/json" \\\n  -H "AccessAffiliateNumber: ${creds.affiliateNumber}" \\\n  -H "AccessServiceNumber: ${creds.serviceNumber}" \\\n  -H "Authorization: Basic ${base64}"`;
    };

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        toast.success(`${field} copied to clipboard!`);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleGenerateLive = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setLiveGenerated(true);
            setIsGenerating(false);
            toast.success("Live credentials successfully generated!");
        }, 1500);
    };

    return (
        <DocsLayout>
            <div className="max-w-4xl space-y-10 pb-16">
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary">
                            <Key className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">API Credentials</h1>
                    </div>
                    <p className="text-xl text-muted-foreground">
                        Access environment URLs, service numbers, and authenticate your integrations using your affiliate credentials.
                    </p>
                </div>

                {/* Service Selector */}
                <div className="bg-muted/30 border border-border p-5 rounded-2xl space-y-3">
                    <label className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Key className="w-4 h-4 text-primary" /> Active Service Profile
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { id: "mto", label: "MTO Submission" },
                            { id: "retail", label: "Retail Submission" },
                            { id: "biller", label: "Biller Submission" }
                        ].map((srv) => (
                            <button
                                key={srv.id}
                                type="button"
                                onClick={() => setSelectedService(srv.id as any)}
                                className={cn(
                                    "px-5 py-2.5 text-sm font-semibold rounded-full border transition-all duration-200",
                                    selectedService === srv.id 
                                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10"
                                        : "bg-background hover:bg-muted/70 border-border text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {srv.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "staging" | "live")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px] border mb-8">
                        <TabsTrigger value="staging" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                            Staging (Testing)
                        </TabsTrigger>
                        <TabsTrigger value="live" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-semibold">
                            Production (Live)
                        </TabsTrigger>
                    </TabsList>
 
                    {/* STAGING CONTENT */}
                    <TabsContent value="staging" className="space-y-8 focus-visible:outline-none">
                        {/* Credentials Card */}
                        <Card className="border shadow-md">
                            <CardHeader className="bg-muted/30 border-b">
                                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                    <Server className="w-5 h-5 text-primary" /> Staging Environment Credentials
                                </CardTitle>
                                <CardDescription>
                                    Use these credentials to authenticate your API client and execute mock transactions in our Sandbox environment.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* API Base URL */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground">Staging API Base URL</label>
                                        <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                            <span className="flex-1 break-all select-all font-semibold">{stagingCreds.baseUrl}</span>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(stagingCreds.baseUrl, "Base URL")}>
                                                {copiedField === "Base URL" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* AccessServiceNumber */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground">AccessServiceNumber</label>
                                        <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                            <span className="flex-1 font-semibold select-all">{stagingCreds.serviceNumber}</span>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(stagingCreds.serviceNumber, "AccessServiceNumber")}>
                                                {copiedField === "AccessServiceNumber" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* AccessAffiliateNumber */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground">AccessAffiliateNumber</label>
                                        <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                            <span className="flex-1 font-semibold select-all">{stagingCreds.affiliateNumber}</span>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(stagingCreds.affiliateNumber, "AccessAffiliateNumber")}>
                                                {copiedField === "AccessAffiliateNumber" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground">Basic Auth Username</label>
                                        <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                            <span className="flex-1 font-semibold select-all">{stagingCreds.username}</span>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(stagingCreds.username, "Username")}>
                                                {copiedField === "Username" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground">Basic Auth Password</label>
                                        <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                            <span className="flex-1 font-semibold select-all">
                                                {showStagingPass ? stagingCreds.password : "••••••••••••••••••••"}
                                            </span>
                                            <div className="flex items-center shrink-0">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowStagingPass(!showStagingPass)}>
                                                    {showStagingPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleCopy(stagingCreds.password, "Password")}>
                                                    {copiedField === "Password" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Interactive cURL / Integration snippet */}
                        <Card className="border shadow-md">
                            <CardHeader className="bg-muted/30 border-b">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Play className="w-4 h-4 text-primary" /> Staging Request Example
                                </CardTitle>
                                <CardDescription>
                                    Test your credentials using the following pre-configured curl command. We automatically calculated your basic authorization token for you.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="relative bg-zinc-950 text-zinc-200 p-4 rounded-xl font-mono text-xs overflow-auto border border-zinc-800">
                                    <button 
                                        onClick={() => handleCopy(getCurlCommand(stagingCreds, stagingBase64, false), "cURL Request")}
                                        className="absolute right-3 top-3 p-1.5 bg-zinc-900 rounded-md hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                                    >
                                        {copiedField === "cURL Request" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <pre className="pr-10 leading-relaxed">
{getCurlCommand(stagingCreds, stagingBase64, false)}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Walkthrough Screenshots */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" /> Postman Connection Configuration
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                View screenshots showing where to configure the Basic Auth headers and parameters inside your Postman requests:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Screenshot 1 */}
                                <div className="border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow group flex flex-col justify-between">
                                    <div className="relative aspect-video overflow-hidden bg-muted/20 border-b cursor-zoom-in" onClick={() => setSelectedScreenshot("/postman_basic_auth.png")}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/postman_basic_auth.png" alt="Postman Basic Auth Setup" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white text-xs font-semibold bg-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                                                <ExternalLink className="w-3.5 h-3.5" /> View Large
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-1">
                                        <h4 className="font-semibold text-sm">Postman Basic Auth Headers</h4>
                                        <p className="text-xs text-muted-foreground">Select Basic Auth in Postman and supply the Username & Password credentials.</p>
                                    </div>
                                </div>

                                {/* Screenshot 2 */}
                                <div className="border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow group flex flex-col justify-between">
                                    <div className="relative aspect-video overflow-hidden bg-muted/20 border-b cursor-zoom-in" onClick={() => setSelectedScreenshot("/staging_credentials.png")}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/staging_credentials.png" alt="Staging Credentials" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white text-xs font-semibold bg-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                                                <ExternalLink className="w-3.5 h-3.5" /> View Large
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-1">
                                        <h4 className="font-semibold text-sm">API Staging Parameters</h4>
                                        <p className="text-xs text-muted-foreground">Verify Base URL and custom AccessServiceNumber/AccessAffiliateNumber headers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* LIVE CONTENT */}
                    <TabsContent value="live" className="space-y-8 focus-visible:outline-none">
                        <AnimatePresence mode="wait">
                            {!liveGenerated ? (
                                <motion.div 
                                    key="pre-live"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    {/* Go Live Checklist */}
                                    <Card className="border shadow-md">
                                        <CardHeader className="bg-orange-500/5 border-b border-orange-500/10">
                                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-orange-600 dark:text-orange-500">
                                                <Lock className="w-5 h-5" /> Live Production Credentials
                                            </CardTitle>
                                            <CardDescription>
                                                You must verify integration parameters and pass compliance reviews before activating your Live Production credentials.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6 space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="font-bold text-sm text-foreground">Go-Live Pre-requisite Checklist</h3>
                                                <div className="space-y-3">
                                                    {/* Step 1 */}
                                                    <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                        <div>
                                                            <h4 className="font-semibold text-sm text-green-800 dark:text-green-400">Sandbox Testing Complete</h4>
                                                            <p className="text-xs text-muted-foreground">Successful transactions initiated and tested under staging environment.</p>
                                                        </div>
                                                    </div>

                                                    {/* Step 2 */}
                                                    <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                        <div>
                                                            <h4 className="font-semibold text-sm text-green-800 dark:text-green-400">Compliance & KYC Approval</h4>
                                                            <p className="text-xs text-muted-foreground">Affiliate merchant profile reviewed and approved by MITO Compliance.</p>
                                                        </div>
                                                    </div>

                                                    {/* Step 3 */}
                                                    <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                        <div>
                                                            <h4 className="font-semibold text-sm text-green-800 dark:text-green-400">Affiliate Agreement Executed</h4>
                                                            <p className="text-xs text-muted-foreground">Service agreements signed by both corporate parties.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Generate Button */}
                                            <div className="pt-4 border-t flex flex-col items-center gap-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    All pre-requisites are met. You can generate your Live credentials now.
                                                </div>
                                                <Button 
                                                    onClick={handleGenerateLive} 
                                                    disabled={isGenerating}
                                                    className="w-full sm:w-auto px-10 h-12 bg-orange-500 hover:bg-orange-600 font-bold text-white shadow-lg shadow-orange-500/20 rounded-lg"
                                                >
                                                    {isGenerating ? (
                                                        <><span className="animate-spin mr-2">⟳</span> Activating Live Environment...</>
                                                    ) : (
                                                        <><Unlock className="w-4 h-4 mr-2" /> Generate Live Credentials</>
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="live-credentials"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    {/* Security Alert Banner */}
                                    <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 text-orange-800 dark:text-orange-400 rounded-xl">
                                        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-orange-600 dark:text-orange-500" />
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-sm">Production API Access Activated</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Live transactions move real funds. Keep your username and password confidential. Never include production API credentials in client-side code or commit them to public version control repositories.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Credentials Card */}
                                    <Card className="border border-orange-200 dark:border-orange-900 shadow-md">
                                        <CardHeader className="bg-orange-500/5 border-b border-orange-500/10">
                                            <CardTitle className="flex items-center gap-2 text-lg font-bold text-orange-600 dark:text-orange-500">
                                                <Unlock className="w-5 h-5" /> Live Production Credentials
                                            </CardTitle>
                                            <CardDescription>
                                                Credentials below are active. You can use them to submit transactions to the live payment gateway.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* API Base URL */}
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Production Base URL</label>
                                                    <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                                        <span className="flex-1 break-all select-all font-semibold">{liveCreds.baseUrl}</span>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(liveCreds.baseUrl, "Live Base URL")}>
                                                            {copiedField === "Live Base URL" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* AccessServiceNumber */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">AccessServiceNumber</label>
                                                    <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                                        <span className="flex-1 font-semibold select-all">{liveCreds.serviceNumber}</span>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(liveCreds.serviceNumber, "Live AccessServiceNumber")}>
                                                            {copiedField === "Live AccessServiceNumber" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* AccessAffiliateNumber */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">AccessAffiliateNumber</label>
                                                    <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                                        <span className="flex-1 font-semibold select-all">{liveCreds.affiliateNumber}</span>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(liveCreds.affiliateNumber, "Live AccessAffiliateNumber")}>
                                                            {copiedField === "Live AccessAffiliateNumber" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Username */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Basic Auth Username</label>
                                                    <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                                        <span className="flex-1 font-semibold select-all">{liveCreds.username}</span>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => handleCopy(liveCreds.username, "Live Username")}>
                                                            {copiedField === "Live Username" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Password */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-muted-foreground">Basic Auth Password</label>
                                                    <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-lg border font-mono text-sm">
                                                        <span className="flex-1 font-semibold select-all">
                                                            {showLivePass ? liveCreds.password : "••••••••••••••••••••"}
                                                        </span>
                                                        <div className="flex items-center shrink-0">
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowLivePass(!showLivePass)}>
                                                                {showLivePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleCopy(liveCreds.password, "Live Password")}>
                                                                {copiedField === "Live Password" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Interactive cURL / Production Request */}
                                    <Card className="border shadow-md">
                                        <CardHeader className="bg-muted/30 border-b">
                                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                                <Play className="w-4 h-4 text-orange-500" /> Live Production Request Example
                                            </CardTitle>
                                            <CardDescription>
                                                Use this request payload to execute transactions in your production environment. Remember to keep the authorization token secure.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="relative bg-zinc-950 text-zinc-200 p-4 rounded-xl font-mono text-xs overflow-auto border border-zinc-800">
                                                <button 
                                                    onClick={() => handleCopy(getCurlCommand(liveCreds, liveBase64, true), "Live cURL Request")}
                                                    className="absolute right-3 top-3 p-1.5 bg-zinc-900 rounded-md hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                                                >
                                                    {copiedField === "Live cURL Request" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                                </button>
                                                <pre className="pr-10 leading-relaxed">
{getCurlCommand(liveCreds, liveBase64, true)}
                                                </pre>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Action items for Production support */}
                                    <div className="flex justify-between items-center bg-muted/40 p-5 rounded-xl border">
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-sm">Need help or a different credential scope?</h4>
                                            <p className="text-xs text-muted-foreground">Contact our technical account management team to request updates or troubleshoot credentials.</p>
                                        </div>
                                        <Button variant="outline" asChild size="sm">
                                            <a href="mailto:support@mito.money" className="flex items-center gap-1">
                                                Support Team <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Lightbox / Zoom Modal */}
            <AnimatePresence>
                {selectedScreenshot && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedScreenshot(null)}
                        className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 15 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-4xl max-h-[85vh] w-full overflow-hidden bg-background rounded-xl border shadow-2xl flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={selectedScreenshot} alt="Postman Configuration Detail" className="max-w-full max-h-[80vh] object-contain" />
                            <button 
                                onClick={() => setSelectedScreenshot(null)}
                                className="absolute top-4 right-4 bg-zinc-950/80 text-zinc-200 hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-800"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DocsLayout>
    );
}
