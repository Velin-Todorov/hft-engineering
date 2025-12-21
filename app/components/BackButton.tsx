"use client";

import { useRouter } from "next/navigation";
import { Icon } from "./Icon";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back to previous page"
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 
                       active:text-cyan-500 transition-colors group
                       min-h-[44px] min-w-[44px] -ml-2 pl-2 pr-4
                       touch-manipulation"
    >
      <Icon className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </Icon>
      Back
    </button>
  );
}
