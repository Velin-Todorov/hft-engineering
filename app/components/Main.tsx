import { getArticles } from "../db/article";
import ArticleCard from "./Article";
import { Sidebar } from "./Sidebar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function Main() {
  // this is server side fetching
  const articles = await getArticles();
  const limit = 10;
  // render it
  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-5">
        <div className="mb-8 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Latest Articles
          </h2>
          <p className="text-sm text-gray-400">
            In-depth technical guides on high-frequency trading systems
          </p>
          <div className="gap-2 order-3">
            <label
              htmlFor="articlesPerPageMobile"
              className="text-sm text-gray-400 whitespace-nowrap"
            >
              Show:
            </label>
            <select
              id="articlesPerPageMobile"
              className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 px-3 py-1.5"
            //   value={limit}
            //   onChange={(e) => console.log(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - Articles */}
          <section className="lg:col-span-8">
            <div className="space-y-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <Sidebar />

          {/* Pagination */}
        </div>
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-cyan-400 transition-colors text-sm">
            Previous
          </button>
          <button className="px-4 py-2 bg-cyan-400 text-black rounded font-bold text-sm">
            1
          </button>
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-cyan-400 transition-colors text-sm">
            2
          </button>
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-cyan-400 transition-colors text-sm">
            3
          </button>
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-cyan-400 transition-colors text-sm">
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
