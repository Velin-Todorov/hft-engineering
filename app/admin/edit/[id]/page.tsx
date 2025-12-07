"use client";

import { useCallback, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";
import { Database } from "@/database.types";
import { getArticleById, useUpdateArticle } from "@/app/db/article";

type Category = Database["public"]["Tables"]["category"]["Row"];
type Author = Database["public"]["Tables"]["author"]["Row"];

interface FormData {
  title: string;
  markdown: string;
  summary: string;
  read_time: string;
  category: string;
  author: string;
  isDraft: boolean;
  likes: number;
  dislikes: number;
}

// Fetch functions extracted for reusability and testing
const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("category").select("*");
  if (error) throw error;
  return data ?? [];
};

const fetchAuthors = async (): Promise<Author[]> => {
  const { data, error } = await supabase.from("author").select("*");
  if (error) throw error;
  return data ?? [];
};

// Helper to transform article data to form data
const articleToFormData = (
  article: Awaited<ReturnType<typeof getArticleById>>
): FormData => ({
  title: article.title,
  markdown: article.markdown,
  summary: article.summary,
  read_time: article.readTime,
  category: article.category?.id.toString() || "",
  author: article.author?.id?.toString() || "",
  isDraft: article.isDraft,
  likes: article.likes,
  dislikes: article.dislikes,
});

// Separated form component that receives initial data as props
interface ArticleFormProps {
  initialData: FormData;
  categories: Category[];
  authors: Author[];
  articleId: string;
}

function ArticleForm({
  initialData,
  categories,
  authors,
  articleId,
}: ArticleFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialData);

  const updateMutation = useUpdateArticle();

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, isDraft: e.target.checked }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(
        {
          articleId,
          data: {
            title: formData.title,
            markdown: formData.markdown,
            summary: formData.summary,
            read_time: formData.read_time,
            category: formData.category ? Number(formData.category) : null,
            author: formData.author ? Number(formData.author) : null,
            isDraft: formData.isDraft,
            likes: formData.likes,
            dislikes: formData.dislikes,
          },
        },
        {
          onSuccess: () => {
            router.push("/admin");
          },
        }
      );
    },
    [formData, articleId, updateMutation, router]
  );

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const error = updateMutation.error
    ? updateMutation.error instanceof Error
      ? updateMutation.error.message
      : "An unexpected error occurred"
    : null;

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="read_time"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Read Time (e.g., &quot;5 minutes&quot;)
            </label>
            <input
              id="read_time"
              type="text"
              value={formData.read_time}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Author
            </label>
            <select
              id="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Summary
          </label>
          <textarea
            id="summary"
            value={formData.summary}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="markdown"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Markdown Content *
          </label>
          <textarea
            id="markdown"
            value={formData.markdown}
            onChange={handleInputChange}
            required
            rows={20}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-100 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDraft}
              onChange={handleCheckboxChange}
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-cyan-400 focus:ring-cyan-400"
            />
            <span className="text-sm text-gray-300">Save as draft</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-100 font-bold px-6 py-2 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

// Main component handles data fetching only
export default function EditArticle() {
  const params = useParams();
  const articleId = params.id as string;

  // Parallel data fetching with React Query
  const {
    data: article,
    isLoading: articleLoading,
    error: articleError,
  } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });

  const { data: authors = [], isLoading: authorsLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
    staleTime: 10 * 60 * 1000,
  });

  const isLoading = articleLoading || categoriesLoading || authorsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (articleError || !article) {
    const errorMessage =
      articleError instanceof Error
        ? articleError.message
        : "Error loading article";
    return (
      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
        {errorMessage}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Edit Article</h2>
      <ArticleForm
        key={articleId}
        initialData={articleToFormData(article)}
        categories={categories}
        authors={authors}
        articleId={articleId}
      />
    </div>
  );
}
