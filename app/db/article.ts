import { Database } from "@/database.types";
import { Insert, Update } from ".";
import { supabase } from "../lib/supabase";
import { Article } from "../types";

type RawArticle = Database["public"]["Tables"]["article"]["Row"];
type RawArticleInsert = Insert<"article">;
type RawArticleUpdate = Update<"article">;

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("article")
    .select(`
      *,
      createdAt:created_at,
      articles_tags (
        tag:tag(
          id,
          name
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }
   const results =  data.map(({ articles_tags, ...rest }) => ({
    ...rest,
    tags: (articles_tags.map((at) => at.tag))
  }));

  return results
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
): Promise<RawArticle | undefined> {
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

