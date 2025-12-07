'use client';
import { usePagination } from '../contexts/PaginationContext';

export default function Pagination() {
  const { limit, currentPage, setCurrentPage, totalArticles } = usePagination();
  const totalPages = Math.ceil(totalArticles / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button 
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-cyan-400 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }
        
        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-4 py-2 rounded text-sm ${
              currentPage === pageNum
                ? 'bg-cyan-400 text-black font-bold'
                : 'bg-gray-800 border border-gray-700 hover:border-cyan-400 transition-colors'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      <button 
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-cyan-400 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}