"use client";

import { Article } from "../types";
import MarkdownRenderer from "./Markdown";

interface ArticlePageProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Article Header */}
      <header className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-5 py-12 lg:py-16">
          {/* Meta Information */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {article.category && (
              <>
                <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                  {article.category.name}
                </span>
                <span className="text-gray-600">•</span>
              </>
            )}
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(article.createdAt)}
            </span>
            {article.readTime && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {article.readTime} minutes
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8">
              {article.summary}
            </p>
          )}

          {/* Author Info */}
          {article.author && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-green-400 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-black">
                  {article.author.name &&
                    article.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300">
                  {article.author.name}
                </p>
                {article.author.position && (
                  <p className="text-xs text-gray-500">
                    {article.author.position}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-4xl mx-auto px-5">
          {/* Article Content */}
          <article>
            <MarkdownRenderer markdown={article.markdown} />
          </article>
        </div>
      </main>
    </div>
  );
}