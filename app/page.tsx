import Layout from "./components/Layout";
import Hero from "./components/Hero";
import LandingPage from "./components/LandingPage";
import { Sidebar } from "./components/Sidebar";
import Pagination from "./components/Pagination";
import { PaginationProvider } from "./contexts/PaginationContext";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <PaginationProvider>
        <div className="max-w-7xl mx-auto px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LandingPage />
            </div>
            <div>
              <Sidebar />
            </div>
          </div>
          <Pagination />
        </div>
      </PaginationProvider>
    </Layout>
  );
}
