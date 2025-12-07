"use client";

import { useCallback, memo } from "react";
import AuthGuard from "./components/AuthGuard";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/create", label: "Create Article" },
] as const;

const AdminNav = memo(function AdminNav() {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    router.push("/");
    await supabase.auth.signOut();
  }, [router]);

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-cyan-400 font-mono">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black text-gray-100">
        <AdminNav />
        <main className="max-w-7xl mx-auto px-5 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}