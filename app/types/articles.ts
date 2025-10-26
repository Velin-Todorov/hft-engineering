export interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  tags: string[] | null;
  codePreview: string | null;
  createdAt: string;
  updatedAt: string;
}