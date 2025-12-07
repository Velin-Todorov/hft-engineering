'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface PaginationContextType {
  limit: number;
  setLimit: (limit: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalArticles: number;
  setTotalArticles: (total: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  return (
    <PaginationContext.Provider 
      value={{ 
        limit, 
        setLimit: (newLimit) => {
          setLimit(newLimit);
          setCurrentPage(1);
        }, 
        currentPage, 
        setCurrentPage,
        totalArticles,
        setTotalArticles
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within PaginationProvider');
  }
  return context;
}