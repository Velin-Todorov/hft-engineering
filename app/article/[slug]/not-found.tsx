import Layout from "@/app/components/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-100 mb-3">
              Article Not Found
            </h2>
            <p className="text-gray-400">
              The article you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
