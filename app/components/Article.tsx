import { formatDate } from "../common/utils";
import { Article } from "../types";
import { BackButton } from "./BackButton";
import { Icon } from "./Icon";
import MarkdownRenderer from "./Markdown";

interface ArticlePageProps {
  article: Article;
}

const CONTAINER_CLASSES = "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8";
const GRADIENT_BG = "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900";

export default function ArticlePage({ article }: ArticlePageProps) {
  const formattedDate = formatDate(article.createdAt);
  const authorInitials =
    article.author?.name
      ?.split(" ")
      .filter(Boolean)
      .map((n) => n[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) ?? "?";

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Back Button */}
      <nav
        className={`${GRADIENT_BG} border-b border-gray-700 sticky top-0 z-10 backdrop-blur-sm bg-opacity-95`}
      >
        <div className={`${CONTAINER_CLASSES} py-3 sm:py-4`}>
          <BackButton />
            <span className="hidden xs:inline">Back to Articles</span>
        </div>
      </nav>

      {/* Article Header */}
      <header className={`${GRADIENT_BG} border-b border-gray-700`}>
        <div className={`${CONTAINER_CLASSES} py-8 sm:py-12 lg:py-16`}>
          {/* Meta Information */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap text-xs sm:text-sm">
            {article.category && (
              <>
                <span
                  className="uppercase tracking-wider font-bold text-cyan-400 
                             bg-cyan-400/10 px-2.5 sm:px-3 py-1 rounded-full"
                >
                  {article.category.name}
                </span>
                <span className="text-gray-600 hidden sm:inline">•</span>
              </>
            )}
            <span className="text-gray-500 flex items-center gap-1">
              <Icon>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </Icon>
              <time dateTime={article.createdAt}>{formattedDate}</time>
            </span>
            {article.readTime && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500 flex items-center gap-1">
                  <Icon>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </Icon>
                  {article.readTime} min read
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold 
                       text-gray-100 mb-4 sm:mb-6 leading-tight"
          >
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 
                         leading-relaxed mb-6 sm:mb-8"
            >
              {article.summary}
            </p>
          )}

          {/* Author Info */}
          {article.author && (
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-green-400 
                           rounded-full flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <span className="text-base sm:text-lg font-bold text-black">
                  {authorInitials}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-300 truncate">
                  {article.author.name}
                </p>
                {article.author.position && (
                  <p className="text-xs text-gray-500 truncate">
                    {article.author.position}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 sm:py-12">
        <div className={CONTAINER_CLASSES}>
          <article className="prose prose-invert prose-cyan max-w-none">
            <MarkdownRenderer markdown={article.markdown} />
          </article>
        </div>
      </main>
    </div>
  );
}
