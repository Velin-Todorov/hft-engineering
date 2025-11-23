"use client";
import { useEffect } from "react";
import { useArticles } from "../db/article";
import ArticleCard from "./ArticleCard";
import { usePagination } from "../contexts/PaginationContext";
import Link from "next/link";

export default function LandingPage() {
  const { limit, setLimit, currentPage, setTotalArticles } = usePagination();
  const { data: articles, error, isLoading } = useArticles(limit);

  useEffect(() => {
    if (articles) {
      setTotalArticles(articles.length);
    }
  }, [articles, setTotalArticles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-400">Error loading articles</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">No articles found</p>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = articles.slice(startIndex, endIndex);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-100">Latest Articles</h2>
          <div className="flex items-center gap-2">
            <label
              htmlFor="articlesPerPageMobile"
              className="text-sm text-gray-400 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="articlesPerPageMobile"
              className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 px-3 py-1.5"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          In-depth technical guides on high-frequency trading systems and low
          latency engineering
        </p>
      </div>

      <div className="space-y-6">
        {paginatedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
