"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DocsSidebar } from "./DocsSidebar";

interface ApiReferenceLayoutProps {
    children: ReactNode;
}

export function ApiReferenceLayout({ children }: ApiReferenceLayoutProps) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const isLoggedIn = document.cookie.split(";").some((c) => c.trim().startsWith("isLoggedIn="));
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) {
        return (
            <div className="flex min-h-screen flex-col bg-background font-sans items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans overflow-x-hidden">
            <Header />
            <div className="flex-1 flex flex-col lg:flex-row w-full relative">
                {/* Left Sidebar - Sticky */}
                <DocsSidebar />

                {/* Main Content Area: Content + Samples */}
                <main className="flex-1 flex flex-col xl:flex-row min-w-0 pb-12 lg:pb-24">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
