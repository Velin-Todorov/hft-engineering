"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";
import { useCategories } from "@/app/db/categories";
import { useAuthors } from "@/app/db/authors";

const inputClasses = `w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                      text-gray-100 focus:outline-none focus:border-cyan-400 transition-colors`;

export default function CreateArticle() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: authors, isLoading: authorsLoading } = useAuthors();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    markdown: "",
    summary: "",
    read_time: "",
    category: "",
    author: "",
    isDraft: true,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: insertError } = await supabase.from("article").insert({
        id: crypto.randomUUID(),
        title: formData.title,
        markdown: formData.markdown,
        summary: formData.summary,
        read_time: formData.read_time,
        category: formData.category ? Number(formData.category) : null,
        author: formData.author ? Number(formData.author) : null,
        isDraft: formData.isDraft,
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) {
        setError(`Error creating article: ${insertError.message}`);
        setLoading(false);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["allArticles"] });
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  };

  const dataLoading = categoriesLoading || authorsLoading;

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center py-12 gap-3">
        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">Loading form data...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6">
        Create New Article
      </h2>

      {error && (
        <div
          role="alert"
          className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
              aria-required="true"
              className={inputClasses}
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
              onChange={(e) => updateField("read_time", e.target.value)}
              className={inputClasses}
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
              onChange={(e) => updateField("category", e.target.value)}
              className={inputClasses}
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
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
              onChange={(e) => updateField("author", e.target.value)}
              className={inputClasses}
            >
              <option value="">Select an author</option>
              {authors?.map((author) => (
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
            onChange={(e) => updateField("summary", e.target.value)}
            rows={3}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="markdown"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Markdown Content <span className="text-red-400">*</span>
          </label>
          <textarea
            id="markdown"
            value={formData.markdown}
            onChange={(e) => updateField("markdown", e.target.value)}
            required
            aria-required="true"
            rows={15}
            className={`${inputClasses} font-mono text-sm`}
          />
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDraft}
              onChange={(e) => updateField("isDraft", e.target.checked)}
              className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-cyan-400 focus:ring-cyan-400"
            />
            <span className="text-sm text-gray-300">Save as draft</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black 
                       font-bold px-6 py-3 rounded transition-colors 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Article"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700 
                       text-gray-100 font-bold px-6 py-3 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}