"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";

interface AdminArticleActionsProps {
  articleId: string;
}

export default function AdminArticleActions({
  articleId,
}: AdminArticleActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("article")
        .delete()
        .eq("id", articleId);

      if (error) {
        alert(`Error deleting article: ${error.message}`);
        setIsDeleting(false);
        return;
      }

      // Invalidate React Query cache
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      
      router.refresh();
    } catch {
      alert("An unexpected error occurred");
      setIsDeleting(false);
    }
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
        disabled={isDeleting}
        className="text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

