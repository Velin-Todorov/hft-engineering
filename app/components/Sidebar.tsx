"use client";

import Link from "next/link";
import { useCategory } from "../contexts/CategoryContext";
import { useMostPopularArticles } from "../db/article";
import { useCategories } from "../db/categories";

export function Sidebar() {
  const { selectedCategories, toggleCategory, isCategorySelected } =
    useCategory();
  const { data: categories } = useCategories();
  const { data: mostPopularArticles } = useMostPopularArticles();

  return (
    <aside className="py-8 sm:py-12 space-y-6 max-w-md mx-auto lg:mx-0">
      {/* Categories */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold">
            Categories
          </h3>
          {selectedCategories.length > 0 && (
            <span className="text-xs bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full">
              {selectedCategories.length} selected
            </span>
          )}
        </div>
        <div className="space-y-1">
          {categories?.map((category) => {
            const isSelected = isCategorySelected(category.id);
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category)}
                aria-pressed={isSelected}
                className={`w-full flex items-center justify-between group 
                           hover:bg-gray-800 active:bg-gray-700 p-3 rounded transition-colors ${
                             isSelected ? "bg-gray-800" : ""
                           }`}
              >
                <span
                  className={`text-sm font-medium ${category.color} 
                             group-hover:translate-x-1 transition-transform ${
                               isSelected ? "translate-x-1" : ""
                             }`}
                >
                  {category.name}
                </span>
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-cyan-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
          {!categories?.length && (
            <p className="text-sm text-gray-500 py-2">No categories</p>
          )}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 font-bold">
          Popular Posts
        </h3>
        <div className="space-y-3">
          {mostPopularArticles?.map((post) => (
            <Link
              key={post.id}
              href={`/article/${post.id}`}
              className="block group p-2 -mx-2 rounded hover:bg-gray-800 active:bg-gray-700 transition-colors"
            >
              <p className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight mb-1">
                {post.title}
              </p>
              <span className="text-xs text-gray-500">{post.likes} likes</span>
            </Link>
          ))}
          {!mostPopularArticles?.length && (
            <p className="text-sm text-gray-500 py-2">No popular posts yet</p>
          )}
        </div>
      </div>
    </aside>
  );
}