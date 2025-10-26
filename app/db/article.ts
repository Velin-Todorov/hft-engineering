import { Database } from "@/database.types";
import { Insert, Update } from ".";
import { supabase } from "../lib/supabase";

type Article = Database["public"]["Tables"]["article"]["Row"];
type ArticleInsert = Insert<"article">;
type ArticleUpdate = Update<"article">;

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }

  return data;
}

export async function createArticle(data: ArticleInsert) {
  return await supabase.from("article").insert(data);
}

export async function deleteArticle(articleId: string) {
    return await supabase.from('article').delete().eq("id", articleId)
}

export async function updateArticle(articleId: string, data: ArticleUpdate) {
    return await supabase.from('article').update(data).eq('id', articleId)
}

export async function getArticleById(
  articleId: string
): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("id", articleId)
    .single();

  if (error) {
    console.error(
      `Failed to fetch article with id ${articleId}. Error:`,
      error.message
    );
    return;
  }

  return data;
}
