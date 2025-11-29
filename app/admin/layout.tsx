"use client";

import AuthGuard from "./components/AuthGuard";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    // Navigate first, then sign out to avoid AuthGuard redirect
    router.push("/");
    await supabase.auth.signOut();
  };

  // Don't wrap login page with AuthGuard or admin navigation
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black text-gray-100">
        <nav className="bg-gray-900 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-5 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-cyan-400 font-mono">
                Admin Dashboard
              </h1>
              <div className="flex items-center gap-4">
                <Link
                  href="/admin"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/create"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Create Article
                </Link>
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
        <main className="max-w-7xl mx-auto px-5 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}

