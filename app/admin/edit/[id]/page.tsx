"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";
import { Database } from "@/database.types";
import { getArticleById } from "@/app/db/article";

type Category = Database["public"]["Tables"]["category"]["Row"];
type Author = Database["public"]["Tables"]["author"]["Row"];

export default function EditArticle() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const articleId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    markdown: "",
    summary: "",
    read_time: "",
    category: "",
    author: "",
    isDraft: true,
    likes: 0,
    dislikes: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Load article
        const article = await getArticleById(articleId);
        setFormData({
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

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("category")
          .select("*");

        if (!categoriesError && categoriesData) {
          setCategories(categoriesData);
        }

        // Fetch authors
        const { data: authorsData, error: authorsError } = await supabase
          .from("author")
          .select("*");

        if (!authorsError && authorsData) {
          setAuthors(authorsData);
        }

        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error.message || "Error loading article");
        setLoading(false);
      }
    }
    loadData();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const updateData = {
        title: formData.title,
        markdown: formData.markdown,
        summary: formData.summary,
        read_time: formData.read_time,
        category: formData.category ? Number(formData.category) : null,
        author: formData.author ? Number(formData.author) : null,
        isDraft: formData.isDraft,
        likes: formData.likes,
        dislikes: formData.dislikes,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from("article")
        .update(updateData)
        .eq("id", articleId);

      if (updateError) {
        setError(`Error updating article: ${updateError.message}`);
        setSaving(false);
        return;
      }

      // Invalidate React Query cache
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      
      router.push("/admin");
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error.message || "An unexpected error occurred");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">Loading article...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Edit Article</h2>

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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, read_time: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
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
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, markdown: e.target.value })
            }
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
              onChange={(e) =>
                setFormData({ ...formData, isDraft: e.target.checked })
              }
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-cyan-400 focus:ring-cyan-400"
            />
            <span className="text-sm text-gray-300">Save as draft</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-100 font-bold px-6 py-2 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

