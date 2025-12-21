import ArticlePage from "@/app/components/Article";
import { getArticleById, getArticles } from "@/app/db/article";
import { validate } from "uuid";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.id,
  }));
}


export default async function ArticlePageRoute({ params }: PageProps) {
  const { slug } = await params;
  
  if (!validate(slug)) {
    notFound();
  }

  let article;
  try {
    article = await getArticleById(slug);
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
      <ArticlePage article={article} />
  );
}

