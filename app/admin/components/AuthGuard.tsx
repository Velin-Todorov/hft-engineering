"use client";

import { useAuth } from "@/app/lib/auth";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !session && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [session, loading, router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!session && !isLoginPage) {
    // Show nothing while redirecting
    return null;
  }

  return <>{children}</>;
}