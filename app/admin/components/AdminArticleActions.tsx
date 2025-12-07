"use client";

import Link from "next/link";
import { useDeleteArticle } from "@/app/db/article";

interface AdminArticleActionsProps {
  articleId: string;
}

export default function AdminArticleActions({
  articleId,
}: AdminArticleActionsProps) {
  const { mutate: deleteArticle, isPending } = useDeleteArticle(articleId);

  const handleDelete = () => {
    if (
      !confirm(
        "Are you sure you want to delete this article? This action cannot be undone."
      )
    ) {
      return;
    }

    deleteArticle();
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/edit/${articleId}`}
        className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        Edit
      </Link>
      <span className="text-gray-600">•</span>
      <Link
        href={`/article/${articleId}`}
        target="_blank"
        className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
      >
        View
      </Link>
      <span className="text-gray-600">•</span>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}