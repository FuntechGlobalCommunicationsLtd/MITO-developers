"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { DocsSidebar } from "./DocsSidebar";

interface ApiReferenceLayoutProps {
    children: ReactNode;
}

export function ApiReferenceLayout({ children }: ApiReferenceLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans overflow-x-hidden">
            <Header />
            <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto relative">
                <DocsSidebar />
                <main className="flex-1 flex flex-col xl:flex-row min-w-0 pb-12 lg:pb-24">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
