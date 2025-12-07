import { Database } from "@/database.types";
import { Insert, Update } from ".";
import { supabase } from "../lib/supabase";
import { Article } from "../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type RawArticle = Database["public"]["Tables"]["article"]["Row"];
type RawArticleInsert = Insert<"article">;
type RawArticleUpdate = Update<"article">;

// Type for article with relationships from Supabase
type ArticleWithRelations = RawArticle & {
  category: Database["public"]["Tables"]["category"]["Row"] | null;
  author: Database["public"]["Tables"]["author"]["Row"] | null;
};

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => getArticles(),
  });
}

export function useAllArticles() {
  return useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => getAllArticles(),
  });
}

export function useMostPopularArticles() {
  return useQuery({
    queryKey: ["mostPopularArticles"],
    queryFn: async () => getMostPopularArticles(),
  });
}

export function useArticle(articleId: string) {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// getArticles fetches only published articles (isDraft = false) for the home page
export async function getArticles(): Promise<Article[]> {
  const { data: articles, error } = await supabase
    .from("article")
    .select(
      `
      *,
      category (*),
      author (*)
    `
    )
    .eq("isDraft", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }

  if (!articles) {
    return [];
  }

  const transformedArticles = articles.map((article) =>
    transformArticle(article as ArticleWithRelations)
  );

  return transformedArticles;
}



// getAllArticles fetches all articles including drafts for admin dashboard
export async function getAllArticles(): Promise<Article[]> {
  const { data: articles, error } = await supabase
    .from("article")
    .select(
      `
      *,
      category (*),
      author (*)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch all articles: ${error.message}`);
  }

  if (!articles) {
    return [];
  }

  const transformedArticles = articles.map((article) =>
    transformArticle(article as ArticleWithRelations)
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
  const { error } = await supabase
    .from("article")
    .update(data)
    .eq("id", articleId);

  if (error) {
    throw new Error(`Failed to update article: ${error.message}`);
  }
}

// Hook to update an article
export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, data }: { articleId: string; data: RawArticleUpdate }) =>
      updateArticle(articleId, data),
    onSuccess: (_, { articleId }) => {
      // Invalidate relevant queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["allArticles"] });
      queryClient.invalidateQueries({ queryKey: ["mostPopularArticles"] });
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
    },
  });
}

// Hook to create an article
export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RawArticleInsert) => createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["allArticles"] });
    },
  });
}

// Hook to delete an article
export function useDeleteArticle(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: (_, articleId) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["allArticles"] });
      queryClient.invalidateQueries({ queryKey: ["mostPopularArticles"] });
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
    },
  });
}

export async function getArticleById(
  articleId: string
): Promise<Article> {
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
  
  if (!data) {
    throw new Error(`Article with id ${articleId} not found`);
  }
  
  const transformedArticle = transformArticle(data as ArticleWithRelations);

  return transformedArticle;
}

// getMostPopularArticles fetches the most popular articles based on how many likes they got. We return the top 5 articles.
export async function getMostPopularArticles(): Promise<RawArticle[]> {
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("isDraft", false)
    .order("likes", { ascending: false })
    .limit(5);

  if (error) {
    console.error(
      `Failed to fetch most popular articles. Error:`,
      error.message
    );
    throw new Error(`Failed to fetch most popular articles: ${error.message}`);
  }
  
  return data || [];
}

function transformArticle(article: ArticleWithRelations): Article {
  const transformedArticle: Article = {
    id: article.id,
    title: article.title,
    markdown: article.markdown,
    readTime: article.read_time,
    likes: article.likes,
    dislikes: article.dislikes,
    category: article.category
      ? {
          id: article.category.id,
          name: article.category.name,
          color: article.category.color,
        }
      : null,
    author: article.author
      ? {
          id: article.author.id,
          photoUrl: article.author.photo_url,
          linkedIn: article.author.linked_in,
          name: article.author.name,
          position: article.author.position,
        }
      : null,
    isDraft: article.isDraft ?? false,
    summary: article.summary,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
  };
  return transformedArticle;
}