"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DocsSidebar } from "./DocsSidebar";

interface DocsLayoutProps {
    children: ReactNode;
    showSidebar?: boolean;
}

export function DocsLayout({ children, showSidebar = true }: DocsLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans">
            <Header />
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-start md:gap-8 lg:gap-12">
                    {showSidebar && <DocsSidebar />}
                    <main className={`flex-1 min-w-0 py-8 lg:py-12 ${showSidebar ? "" : "w-full"}`}>
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
