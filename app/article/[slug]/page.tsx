import ArticlePage from "@/app/components/Article";
import Layout from "@/app/components/Layout";
import { getArticleById } from "@/app/db/article";
import { validate } from "uuid";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePageRoute({ params }: PageProps) {
  let article;
  const { slug } = await params;
  if (!validate(slug)) {
    notFound()
  }

  try {
    article = await getArticleById(slug);
  } catch {
    notFound()
  }

  if (!article) {
    notFound();
  }
  return (
    <Layout>
      <ArticlePage article={article} />
    </Layout>
  );
}
