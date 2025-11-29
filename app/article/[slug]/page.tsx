import ArticlePage from "@/app/components/Article";
import Layout from "@/app/components/Layout";
import { getArticleById } from "@/app/db/article";
import { validate } from "uuid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  if (!validate(slug)) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  try {
    const article = await getArticleById(slug);
    
    if (!article) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
      };
    }

    return {
      title: `${article.title} | HFT Engineering`,
      description: article.summary || `Read ${article.title} on HFT Engineering.`,
      openGraph: {
        title: article.title,
        description: article.summary || "",
        type: "article",
        publishedTime: article.createdAt,
        modifiedTime: article.updatedAt,
        authors: article.author?.name ? [article.author.name] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.summary || "",
      },
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }
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
