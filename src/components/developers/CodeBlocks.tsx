"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CodeBlockProps {
    code: string;
    language?: string;
    hideHeader?: boolean;
    isNested?: boolean;
}

export function CodeBlock({
    code,
    language = "json",
    hideHeader = false,
    isNested = false,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div 
            className={`relative group flex flex-col h-full max-w-full overflow-hidden ${
                isNested 
                    ? "bg-transparent border-0 rounded-none" 
                    : "rounded-lg bg-[#0d1117] border border-slate-800/80"
            }`}
        >
            {!hideHeader && (
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 text-xs text-slate-400 font-mono shrink-0">
                    <span>{language}</span>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1.5 hover:text-slate-200 transition-colors p-1"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            )}
            <pre className="flex-1 p-4 overflow-x-auto overflow-y-auto text-sm font-mono leading-relaxed text-[#c9d1d9]">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export interface CodeTab {
    language: string;
    label: string;
    code: string;
}

export function CodeTabs({ tabs, height = "220px" }: { tabs: CodeTab[]; height?: string }) {
    const [activeTabLabel, setActiveTabLabel] = useState(tabs && tabs.length > 0 ? tabs[0].label : "");
    const [copied, setCopied] = useState(false);

    if (!tabs || tabs.length === 0) return null;

    const activeTab = tabs.find((t) => t.label === activeTabLabel) || tabs[0];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(activeTab.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Tabs 
            value={activeTabLabel} 
            onValueChange={setActiveTabLabel} 
            className="w-full flex flex-col rounded-lg border border-slate-800 bg-[#0d1117] overflow-hidden shadow-md"
        >
            {/* Unified Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-2 shrink-0">
                {/* Tabs List */}
                <TabsList className="flex bg-transparent p-0 h-10 border-0 gap-1">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.label}
                            value={tab.label}
                            className="rounded-none border-b-2 border-transparent text-slate-400 hover:text-slate-200 data-[state=active]:text-white data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full text-sm font-medium transition-all"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Unified Actions */}
                <div className="flex items-center gap-3 pr-3 font-mono text-xs text-slate-400">
                    <span className="opacity-60">{activeTab.language}</span>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1.5 hover:text-slate-200 transition-colors p-1.5 rounded-md hover:bg-slate-800/50"
                        aria-label="Copy active tab code"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-green-500 font-medium">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Tab Contents */}
            {tabs.map((tab) => (
                <TabsContent
                    key={tab.label}
                    value={tab.label}
                    className="mt-0 outline-none"
                    style={{ height }}
                >
                    <CodeBlock code={tab.code} language={tab.language} hideHeader={true} isNested={true} />
                </TabsContent>
            ))}
        </Tabs>
    );
}
