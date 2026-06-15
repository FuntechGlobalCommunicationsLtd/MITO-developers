"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = document.cookie.split(";").some((c) => c.trim().startsWith("isLoggedIn="));
      setIsLoggedIn(loggedIn);
    };
    checkLogin();
    window.addEventListener("focus", checkLogin);
    return () => window.removeEventListener("focus", checkLogin);
  }, []);

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    router.push("/developers");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <svg width="28" height="36" viewBox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_logo)">
                <path d="M36.5911 44.4182C36.5495 43.9758 36.419 43.5462 36.2072 43.1552L24.6276 21.1158L36.2468 5.22962C36.7606 4.5267 36.9733 3.64903 36.8382 2.78969C36.7032 1.93034 36.2313 1.1597 35.5266 0.647289C34.9544 0.23274 34.2669 0.0064727 33.5597 5.95182e-07H3.28473C2.8533 -0.000258839 2.42605 0.0842981 2.02741 0.248836C1.62877 0.413374 1.26656 0.654666 0.961496 0.958914C0.656429 1.26316 0.414487 1.6244 0.249506 2.02197C0.084525 2.41954 -0.000259536 2.84564 5.96784e-07 3.27591V44.7182C0.00306492 45.2333 0.126658 45.7406 0.360941 46.1997C0.595225 46.6588 0.93373 47.057 1.34951 47.3626C2.01805 47.8427 2.84222 48.0566 3.66061 47.9624C4.479 47.8682 5.23266 47.4728 5.77401 46.8534C5.83337 46.7863 5.88482 46.7153 5.94022 46.6561L15.0742 34.1603L31.205 47.2363C31.4606 47.4467 31.746 47.6183 32.0519 47.7454C34.2958 48.7006 36.8405 46.8416 36.5911 44.4182ZM13.8513 24.7154L6.57738 34.6615V6.55972H27.1366L16.9065 20.5435L22.9892 32.1197L13.8513 24.7154Z" fill="#FE3B1F"/>
              </g>
              <defs>
                <clipPath id="clip0_logo">
                  <rect width="36.878" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span className="font-bold text-xl hidden sm:inline-block">MITO</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="https://mito.money" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Solutions
            </Link>
            <Link href="https://mito.money/about-us" className="transition-colors hover:text-foreground/80 text-foreground/60">
              About us
            </Link>
            <Link href="/developers" className="transition-colors hover:text-foreground/80 text-foreground font-semibold">
              Developers
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="outline" className="border-primary/20 hover:bg-primary/5 text-primary rounded-md px-6 font-semibold">
              Logout <LogOut className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-md px-6 font-semibold">
              <Link href="/login">
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
