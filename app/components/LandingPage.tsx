"use client";
import { useEffect, useMemo } from "react";
import { useArticles } from "../db/article";
import ArticleCard from "./ArticleCard";
import { usePagination } from "../contexts/PaginationContext";
import { useCategory } from "../contexts/CategoryContext";

export default function LandingPage() {
  const { limit, setLimit, currentPage, setTotalArticles } = usePagination();
  const { toggleCategory, selectedCategories, clearCategories } = useCategory();

  const { data: articles, error, isLoading } = useArticles(limit);

 let filteredArticles = articles || [];
  
  if (selectedCategories.length > 0) {
    const selectedCategoryIds = selectedCategories.map((cat) => cat.id);
    filteredArticles = filteredArticles.filter((article) =>
      article.category && selectedCategoryIds.includes(article.category.id)
    );
  }

  useEffect(() => {
    setTotalArticles(filteredArticles.length);
  }, [filteredArticles.length, setTotalArticles]);


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

  if (!filteredArticles || filteredArticles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">
          {selectedCategories.length > 0
            ? `No articles found in selected categories`
            : "No articles found"}
        </p>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-100">
            {selectedCategories.length > 0
              ? `Articles from (${selectedCategories.length} ${
                  selectedCategories.length === 1 ? "category" : "categories"
                })`
              : "Latest Articles"}
          </h2>
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
          {selectedCategories.length > 0
            ? `Showing articles from: ${selectedCategories
                .map((cat) => cat.name)
                .join(", ")}`
            : "In-depth technical guides on high-frequency trading systems and low latency engineering"}
        </p>

        {/* Show active filters with individual remove buttons */}
        {selectedCategories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500">Active filters:</span>
            {selectedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category)}
                className="inline-flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs px-2 py-1 rounded-full hover:bg-cyan-400/20 transition-colors"
              >
                {category.name}
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {paginatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
