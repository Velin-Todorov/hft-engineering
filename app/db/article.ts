import { Database } from "@/database.types";
import { Insert, Update } from ".";
import { supabase } from "../lib/supabase";
import { Article } from "../types";
import { useQuery } from "@tanstack/react-query";

type RawArticle = Database["public"]["Tables"]["article"]["Row"];
type RawArticleInsert = Insert<"article">;
type RawArticleUpdate = Update<"article">;

export function useArticles(limit: number = 10) {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => getArticles(limit),
  });
}

export function useMostPopularArticles() {
  return useQuery({
    queryKey: ["mostPopularArticles"],
    queryFn: async () => getMostPopularArtictles(),
  });
}

export async function getArticles(limit: number = 10): Promise<Article[]> {
  const { data: articles, error } = await supabase
    .from("article")
    .select(
      `
      *,
      category (*),
      author (*)
    `
    )
    .limit(limit)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }

  const transformedArticles = articles?.map((article) =>
    transformArticle(article)
  );

  return transformedArticles;
}

export async function createArticle(data: RawArticleInsert) {
  return await supabase.from("article").insert(data);
}

export async function deleteArticle(articleId: string) {
  return await supabase.from("article").delete().eq("id", articleId);
}

export async function updateArticle(articleId: string, data: RawArticleUpdate) {
  return await supabase.from("article").update(data).eq("id", articleId);
}

export async function getArticleById(
  articleId: string
): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from("article")
    .select(
      `
      *,
      category (*),
      author(*)
    `
    )
    .eq("id", articleId)
    .single();

  if (error) {
    throw new Error(
      `Failed to fetch article with id ${articleId}. Error: ${error.message}`
    );
  }
  const transformedArticle = transformArticle(data);

  return transformedArticle;
}

// getMostPopularArtictles fetches the most popular articles based on how many likes they got. We return the top 5 articles.
export async function getMostPopularArtictles(): Promise<
  RawArticle[] | undefined
> {
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .order("likes", { ascending: false })
    .limit(5);

  if (error) {
    console.error(
      `Failed to fetch most popular articles. Error:`,
      error.message
    );
    return;
  }
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformArticle(article: any): Article {
  const transformedArticle = {
    ...article,
    author: {
      id: article.author && article.author.id,
      photoUrl: article.author && article.author.photo_url,
      linkedIn: article.author && article.author.linked_in,
      name: article.author && article.author.name,
      position: article.author && article.author.position,
    },

    createdAt: article.created_at,
    readTime: article.read_time,
    updatedAt: article.updated_at,
  };
  return transformedArticle;
}
