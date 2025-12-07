// contexts/CategoryContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface Category {
  id: number;
  name: string;
  color: string;
}

interface CategoryContextType {
  selectedCategories: Category[];
  toggleCategory: (category: Category) => void;
  clearCategories: () => void;
  isCategorySelected: (categoryId: number) => boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((cat) => cat.id === category.id);
      if (isSelected) {
        return prev.filter((cat) => cat.id !== category.id);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const isCategorySelected = (categoryId: number) => {
    return selectedCategories.some((cat) => cat.id === categoryId);
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategories,
        toggleCategory,
        clearCategories,
        isCategorySelected,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within CategoryProvider');
  }
  return context;
}