"use client";

import { useEffect, useMemo } from "react";
import { useArticles } from "../db/article";
import ArticleCard from "./ArticleCard";
import Error from "./Error";
import { usePagination } from "../contexts/PaginationContext";
import { useCategory } from "../contexts/CategoryContext";

export default function LandingPage() {
  const { limit, setLimit, currentPage, setCurrentPage, setTotalArticles } =
    usePagination();
  const { toggleCategory, selectedCategories, clearCategories } = useCategory();

  const { data: articles, error, isLoading, refetch } = useArticles();

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (selectedCategories.length === 0) return articles;

    const selectedIds = new Set(selectedCategories.map((cat) => cat.id));
    return articles.filter(
      (article) => article.category && selectedIds.has(article.category.id)
    );
  }, [articles, selectedCategories]);

  useEffect(() => {
    setTotalArticles(filteredArticles.length);
  }, [filteredArticles.length, setTotalArticles]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories.length, setCurrentPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 gap-3">
        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Error
        title="Failed to load articles"
        message="We couldn't fetch the articles. Please try again."
        onRetry={refetch}
        showHomeLink={false}
      />
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-400 mb-4">
          {selectedCategories.length > 0
            ? "No articles found in selected categories"
            : "No articles found"}
        </p>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearCategories}
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  const startIndex = (currentPage - 1) * limit;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + limit);

  const categoryLabel =
    selectedCategories.length === 1 ? "category" : "categories";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
            {selectedCategories.length > 0
              ? `Articles (${selectedCategories.length} ${categoryLabel})`
              : "Latest Articles"}
          </h2>

          <div className="flex items-center gap-2">
            <label htmlFor="articlesPerPage" className="text-sm text-gray-400">
              Show:
            </label>
            <select
              id="articlesPerPage"
              className="bg-gray-900 border border-gray-700 text-gray-300 text-sm 
                         rounded-lg focus:ring-cyan-400 focus:border-cyan-400 px-3 py-1.5"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-400">
          {selectedCategories.length > 0
            ? `Showing articles from: ${selectedCategories.map((c) => c.name).join(", ")}`
            : "In-depth technical guides on high-frequency trading systems and low latency engineering"}
        </p>

        {/* Active Filters */}
        {selectedCategories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500">Active filters:</span>
            {selectedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category)}
                aria-label={`Remove ${category.name} filter`}
                className="inline-flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/30 
                           text-cyan-400 text-xs px-2 py-1 rounded-full 
                           hover:bg-cyan-400/20 active:bg-cyan-400/30 transition-colors"
              >
                {category.name}
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ))}
            <button
              onClick={clearCategories}
              className="text-xs text-red-400 hover:text-red-300 active:text-red-200"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Article List */}
      <div className="space-y-6">
        {paginatedArticles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            showDivider={index < paginatedArticles.length - 1}
          />
        ))}
      </div>
    </div>
  );
}