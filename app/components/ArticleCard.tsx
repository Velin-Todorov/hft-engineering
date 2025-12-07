import Link from "next/link";
import { formatDate, getTagColor } from "../common/utils";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
  showDivider?: boolean;
}

const Icon = ({
  children,
  className = "w-4 h-4",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default function ArticleCard({
  article,
  showDivider = true,
}: ArticleCardProps) {
  return (
    <article className="group">
      <Link
        href={`/article/${article.id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 
                   focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
        aria-label={`Read article: ${article.title}`}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Image/Thumbnail */}
          <div
            className="shrink-0 w-full sm:w-48 h-36 sm:h-32 bg-gradient-to-br from-gray-800 to-gray-900 
                       rounded-lg border border-gray-700 flex items-center justify-center 
                       relative overflow-hidden group-hover:border-cyan-400 
                       group-focus-visible:border-cyan-400 transition-all duration-300"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div
              className="text-5xl opacity-30 group-hover:opacity-50 group-hover:scale-110 
                         transition-all duration-300 select-none"
              aria-hidden="true"
            >
              ⚡
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col py-1">
            {/* Tags and Date */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {article.category && (
                <span
                  className={`text-xs uppercase tracking-wide font-bold px-2 py-0.5 rounded ${getTagColor(
                    article.category.color
                  )}`}
                >
                  {article.category.name}
                </span>
              )}
              <time
                dateTime={article.createdAt}
                className="text-xs text-gray-500"
              >
                {formatDate(article.createdAt)}
              </time>
            </div>

            {/* Title */}
            <h2
              className="text-lg sm:text-xl font-bold text-gray-100 mb-2 
                         group-hover:text-cyan-400 group-focus-visible:text-cyan-400 
                         transition-colors line-clamp-2"
            >
              {article.title}
            </h2>

            {/* Excerpt */}
            {article.summary && (
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3 grow">
                {article.summary}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {article.readTime && (
                  <span className="flex items-center gap-1">
                    <Icon>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </Icon>
                    {article.readTime} min
                  </span>
                )}
                {article.likes !== undefined && article.likes > 0 && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span className="flex items-center gap-1">
                      <Icon>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </Icon>
                      <span className="sr-only">{article.likes} likes</span>
                      <span aria-hidden="true">{article.likes}</span>
                    </span>
                  </>
                )}
              </div>

              {/* Read indicator - visible on mobile, animated on desktop */}
              <span
                className="text-cyan-400 text-sm font-bold flex items-center gap-1 
                           sm:opacity-0 sm:group-hover:opacity-100 
                           sm:group-focus-visible:opacity-100
                           sm:translate-x-0 sm:group-hover:translate-x-1 
                           transition-all"
                aria-hidden="true"
              >
                Read
                <Icon>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </Icon>
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Divider - controlled by prop */}
      {showDivider && <div className="mt-6 border-t border-gray-800" />}
    </article>
  );
}
