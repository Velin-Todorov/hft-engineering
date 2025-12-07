export interface Article {
  id: string;
  title: string;
  markdown: string;
  readTime: string;
  category: Category | null;
  author: Author | null;
  isDraft: boolean;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  color: string;
}

interface Author {
  id: number | null;
  name: string | null;
  position: string | null;
  photoUrl: string | null;
  linkedIn: string | null;
}
