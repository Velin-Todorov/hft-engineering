"use client";

import { useAuth } from "@/app/lib/auth";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect if we're on an admin route (not login, not home)
    const isAdminRoute = pathname?.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";
    
    if (!loading && !session && !hasRedirected.current && isAdminRoute && !isLoginPage) {
      hasRedirected.current = true;
      router.push("/admin/login");
    }
    // Reset redirect flag if we're on login page or not on admin route
    if (isLoginPage || !isAdminRoute) {
      hasRedirected.current = false;
    }
  }, [session, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

