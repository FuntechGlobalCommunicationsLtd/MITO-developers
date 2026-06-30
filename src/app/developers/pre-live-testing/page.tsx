"use client";

import { DocsLayout } from "@/components/layout/DocsLayout";
import { Landmark, Search, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BeneficiaryAccount {
    currency: string;
    country: string;
    type: string;
    provider: string;
    number: string;
    name: string;
}

const beneficiaryAccounts: BeneficiaryAccount[] = [
    { currency: "NGN", country: "Nigeria", type: "Bank Account", provider: "United Bank of Africa", number: "101 831 6888", name: "Topupnigeria.com nig Ltd" },
    { currency: "XOF", country: "Mali", type: "Mobile Money", provider: "Orange", number: "+22394023155", name: "-" },
    { currency: "GNF", country: "Guinea Conakry", type: "Mobile Money", provider: "Orange Guinea", number: "+224621499214", name: "-" },
    { currency: "XAF", country: "Cameroon", type: "Mobile Money", provider: "MTN", number: "+237655737037", name: "Boubacar Diallo" },
    { currency: "XOF", country: "Senegal", type: "Mobile Money", provider: "Orange Senegal", number: "+221775913063", name: "-" },
    { currency: "GHS", country: "Ghana", type: "Mobile Money", provider: "MTN", number: "0244582582", name: "Emmanuel Kofi" },
    { currency: "KES", country: "Kenya", type: "Bank Account", provider: "Equity Bank", number: "1710185926608", name: "ASHLEY KASISI" },
    { currency: "KES", country: "Kenya", type: "Mobile Money", provider: "Mpesa", number: "254728893174", name: "WAITERE MUTAH" },
    { currency: "TZS", country: "Tanzania", type: "Mobile Money", provider: "Tigopesa", number: "255765412309", name: "SALUMU SHUKIA" }
];

export default function PreLiveTestingPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

    const handleCopy = (num: string) => {
        navigator.clipboard.writeText(num.replace(/\s+/g, ""));
        setCopiedNumber(num);
        toast.success(`Account/Wallet number copied: ${num}`);
        setTimeout(() => setCopiedNumber(null), 2000);
    };

    const filteredAccounts = beneficiaryAccounts.filter(acc => {
        const query = searchQuery.toLowerCase();
        return (
            acc.currency.toLowerCase().includes(query) ||
            acc.country.toLowerCase().includes(query) ||
            acc.type.toLowerCase().includes(query) ||
            acc.provider.toLowerCase().includes(query) ||
            acc.number.toLowerCase().includes(query) ||
            acc.name.toLowerCase().includes(query)
        );
    });

    return (
        <DocsLayout>
            <div className="max-w-4xl space-y-8 pb-16">
                {/* Header */}
                <div className="relative animate-in fade-in slide-in-from-bottom-3 duration-500">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-2xl blur opacity-10 animate-pulse"></div>
                    <div className="relative bg-background border p-6 md:p-8 rounded-2xl shadow-sm">
                        <Landmark className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4" />
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Pre-Live Testing Beneficiary Accounts</h1>
                        <p className="text-lg text-muted-foreground">
                            Before launching your service in production, please use the following verified beneficiary accounts to perform real-world end-to-end tests for each respective corridor.
                        </p>
                    </div>
                </div>



                {/* Filter and Table */}
                <div className="space-y-4 pt-4 animate-in fade-in duration-1000">
                    <div className="relative flex items-center max-w-md">
                        <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter by country, currency, bank, number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10"
                        />
                    </div>

                    <div className="w-full overflow-x-auto rounded-xl border bg-card text-card-foreground shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground border-b uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Currency</th>
                                    <th className="px-4 py-3 font-semibold">Country</th>
                                    <th className="px-4 py-3 font-semibold">Type</th>
                                    <th className="px-4 py-3 font-semibold">Bank/Network</th>
                                    <th className="px-4 py-3 font-semibold">Account/Wallet No.</th>
                                    <th className="px-4 py-3 font-semibold">Beneficiary Name</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y relative">
                                {filteredAccounts.length > 0 ? (
                                    filteredAccounts.map((acc, index) => (
                                        <tr key={index} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-4 py-3 font-mono font-semibold text-primary">{acc.currency}</td>
                                            <td className="px-4 py-3 font-medium">{acc.country}</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="inline-flex items-center rounded-full px-2 py-0.5 font-medium bg-muted text-muted-foreground">
                                                    {acc.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{acc.provider}</td>
                                            <td className="px-4 py-3 font-mono text-xs font-semibold">{acc.number}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{acc.name}</td>
                                            <td className="px-4 py-3 text-right">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleCopy(acc.number)}
                                                    className="h-8 px-2 py-0 transition-all duration-200"
                                                >
                                                    {copiedNumber === acc.number ? (
                                                        <Check className="w-3.5 h-3.5 text-green-500 mr-1" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5 mr-1" />
                                                    )}
                                                    {copiedNumber === acc.number ? "Copied" : "Copy"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                                            No beneficiary accounts match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
