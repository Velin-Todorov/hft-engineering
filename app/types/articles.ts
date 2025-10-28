import { Tag } from "./tag";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  tags: Tag[] | null;
  codePreview: string | null;
  createdAt: string
}