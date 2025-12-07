import { Database } from "@/database.types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";


type Author = Database["public"]["Tables"]["author"]["Row"]

export async function getAuthors(): Promise<Author[]> {
    const { data: authors, error } = await supabase
        .from("author")
        .select(
            `*`
        )
    
    if (error) {
        throw new Error(`"Failed to fetch authors: ${error.message}`)
    }

    if (!authors) {
        return [];
    }

    return authors
}

export function useAuthors() {
  return useQuery({
    queryKey: ["allAuthors"],
    queryFn: async () => getAuthors(),
  });
}