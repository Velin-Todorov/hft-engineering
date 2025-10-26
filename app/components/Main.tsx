import { Article } from "../types/articles";
import ArticleCard from "./Article";


const articles: Article[] = [
  {
    id: "1",
    title: "Zero-Copy Network Programming in Go",
    excerpt:
      "Implementing kernel bypass techniques and DPDK integration for sub-microsecond network I/O. We'll explore memory mapping, ring buffers, and Go's runtime considerations for HFT applications.",
    createdAt: "Dec 15, 2024",
    updatedAt: "Dec 15, 2024",
    readTime: "8 min read",
    tags: ["networking"],
    codePreview: `type RingBuffer struct {
    data     []byte
    readPos  uint64
    writePos uint64
    mask     uint64
}

func (rb *RingBuffer) Write(data []byte) bool {
    // Lock-free implementation...
}`,
  },
  {
    id: "2",
    title: "Lock-Free Order Book Implementation",
    excerpt:
      "Building a high-performance order book using compare-and-swap operations and memory ordering guarantees. Handling millions of updates per second with consistent sub-100ns latency.",
    createdAt: "Dec 10, 2024",
    updatedAt: "Dec 10, 2024",
    readTime: "12 min read",
    tags: ["datastructures"],
    codePreview: `type OrderBook struct {
    bids *LockFreeTree
    asks *LockFreeTree
}

func (ob *OrderBook) AddOrder(order *Order) {
    // Atomic operations for thread safety...
}`,
  },
  {
    id: "3",
    title: "CPU Cache Optimization for Trading Algorithms",
    excerpt:
      "Memory layout strategies, cache-friendly data structures, and NUMA considerations for maximum throughput. Practical techniques to minimize cache misses in hot trading paths.",
    createdAt: "Dec 5, 2024",
    updatedAt: "Dec 5, 2024",
    readTime: "15 min read",
    tags: ["performance"],
    codePreview: `// Cache-aligned structure for hot path
type alignas(64) PriceLevel struct {
    price    float64
    quantity uint64
    orders   []*Order
    _        [40]byte // padding
}`,
  },
];

export default async function Main() {
  // fetch the data here
  // const articles = await call();

  // render it
  return (
  <main className="py-12">
    <div className="max-w-7xl mx-auto px-5">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Latest Articles
        </h2>
        <p className="text-sm text-gray-400">
          In-depth technical guides on high-frequency trading systems
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - Articles */}
        <section className="lg:col-span-8">
          <div className="space-y-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination */}
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
        </section>

        {/* Sidebar */}
      </div>
    </div>
  </main>
  );
}
