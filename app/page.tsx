import Layout from "./components/Layout";
import Hero from "./components/Hero";
import LandingPage from "./components/LandingPage";
import { Sidebar } from "./components/Sidebar";
import Pagination from "./components/Pagination";
import { PaginationProvider } from "./contexts/PaginationContext";
import Newsletter from "./components/Newsletter";
import { CategoryProvider } from "./contexts/CategoryContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HFT Engineering | High-Frequency Trading Systems & Low Latency Engineering",
  description: "Deep dives into High-Frequency Trading systems, lock-free programming, and microsecond-level optimizations. Code examples in Go, Python and Java.",
  keywords: ["HFT", "high frequency trading", "low latency", "systems programming", "Go", "Python", "Java"],
  openGraph: {
    title: "HFT Engineering",
    description: "Deep dives into High-Frequency Trading systems, lock-free programming, and microsecond-level optimizations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HFT Engineering",
    description: "Deep dives into High-Frequency Trading systems, lock-free programming, and microsecond-level optimizations.",
  },
};

export default function Home() {
  return (
    <Layout>
      <Hero />
      <PaginationProvider>
        <CategoryProvider>
          <div className="max-w-7xl mx-auto px-5 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LandingPage />
              </div>
              <div>
                <Sidebar />
                <Newsletter />
              </div>
            </div>
            <Pagination />
          </div>
        </CategoryProvider>
      </PaginationProvider>
    </Layout>
  );
}
