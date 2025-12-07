"use client";

import Link from "next/link";
import { formatDate } from "../common/utils";
import AdminArticleActions from "./components/AdminArticleActions";
import { useAllArticles } from "../db/article";

export default function AdminDashboard() {
  const { data: articles = [], isLoading, error } = useAllArticles();

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

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/admin/create"
          className="inline-block bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-6 py-2 rounded transition-colors"
        >
          + Create New Article
        </Link>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Title
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Created
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 px-4 text-center text-gray-400">
                  No articles found. Create your first article!
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-100 font-medium">
                        {article.title || "Untitled"}
                      </span>
                      {article.summary && (
                        <span className="text-xs text-gray-500 line-clamp-1">
                          {article.summary}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {article.isDraft ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/30">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {article.category ? (
                      <span className="text-sm text-gray-300">
                        {article.category.name}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <AdminArticleActions articleId={article.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

