"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";
import { useState } from "react";

// Default options for QueryClient
const defaultQueryOptions = {
  queries: {
    // Stale time: how long data is considered fresh
    staleTime: 60 * 1000, // 1 minute
    // Cache time: how long unused data stays in cache
    gcTime: 5 * 60 * 1000, // 5 minutes (previously cacheTime)
    // Retry failed requests
    retry: 1,
    // Refetch on window focus (useful for keeping data fresh)
    refetchOnWindowFocus: false,
  },
};

// React Query context provider that wraps our app
export function QueryClientProvider(props: { children: React.ReactNode }) {
  // Create QueryClient inside the component to ensure it's created per app instance
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: defaultQueryOptions })
  );

  return (
    <QueryClientProviderBase client={queryClient}>
      {props.children}
    </QueryClientProviderBase>
  );
}