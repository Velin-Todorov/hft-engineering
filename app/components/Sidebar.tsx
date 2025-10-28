import { getMostPopularArtictles } from "../db/article";
import { getCategories } from "../db/categories";
import { getTags } from "../db/tag";
import { Newsletter } from "./Newsletter";

export async function Sidebar() {
  const tags = await getTags();
  const categories = await getCategories();
  const mostPopularArticles = await getMostPopularArtictles();

  return (
    <aside className="lg:col-span-4 space-y-8">
      {/* Categories */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 font-bold">
          Categories
        </h3>
        <div className="space-y-3">
          {categories &&
            categories.map((category) => (
              <a
                key={category.id}
                href="#"
                className="flex items-center justify-between group hover:bg-gray-800 p-2 rounded transition-colors"
              >
                <span
                  className={`text-sm font-medium ${category.color} group-hover:translate-x-1 transition-transform`}
                >
                  {category.name}
                </span>
              </a>
            ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 font-bold">
          Popular Posts
        </h3>
        <div className="space-y-4">
          {mostPopularArticles &&
            mostPopularArticles.map((post, index) => (
              <a key={index} href="#" className="block group">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-green-400/20 rounded flex items-center justify-center text-cyan-400 text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight mb-1">
                      {post.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {post.likes} likes
                    </span>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 font-bold">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags &&
            tags.map((tag) => (
              <a
                key={tag.id}
                href="#"
                className="text-xs bg-gray-800 hover:bg-cyan-400 hover:text-black px-3 py-1 rounded-full transition-colors"
              >
                #{tag.name}
              </a>
            ))}
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />
    </aside>
  );
}
