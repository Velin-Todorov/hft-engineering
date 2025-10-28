import { formatDate, getTagColor } from "../common/utils";
import { Article } from "../types";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group cursor-pointer">
      <div className="flex gap-6">
        <div className="flex-shrink-0 w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
            ⚡
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {article.tags && article.tags.map((tag) => (
              <span
                key={tag.id}
                className={`text-xs uppercase tracking-wide font-bold ${getTagColor(
                  tag.name
                )}`}
              >
                {tag.name}
              </span>
            ))}
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{formatDate(article.createdAt)}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {article.title}
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{article.readTime}</span>
            <span className="text-cyan-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              Read →
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800" />
    </article>
  );
}
