"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DocsSidebar } from "./DocsSidebar";

interface DocsLayoutProps {
    children: ReactNode;
    showSidebar?: boolean;
}

export function DocsLayout({ children, showSidebar = true }: DocsLayoutProps) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(!showSidebar);

    useEffect(() => {
        if (showSidebar) {
            const isLoggedIn = document.cookie.split(";").some((c) => c.trim().startsWith("isLoggedIn="));
            if (!isLoggedIn) {
                router.push("/login");
            } else {
                setAuthorized(true);
            }
        }
    }, [showSidebar, router]);

    if (showSidebar && !authorized) {
        return (
            <div className="flex min-h-screen flex-col bg-background font-sans items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

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
