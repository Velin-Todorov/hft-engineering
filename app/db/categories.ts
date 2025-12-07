import { Database } from "@/database.types";
import { Insert, Update } from ".";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

type Category = Database["public"]["Tables"]["category"]["Row"];
type CategoryInsert = Insert<"category">;
type CategoryUpdate = Update<"category">;

export function useCategories() {
   return useQuery({
    queryKey: ['categories'],
    queryFn: async () => getCategories()
   })
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("category").select("*");

  if (error) {
    console.error("Failed to fetch categories", error.message);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return data || [];
}

export async function createCategory(data: CategoryInsert) {
  return await supabase.from("category").insert(data);
}

export async function deleteCategory(categoryId: number) {
  return await supabase.from("category").delete().eq("id", categoryId);
}

export async function updateCategory(categoryId: number, data: CategoryUpdate) {
  return await supabase.from("category").update(data).eq("id", categoryId);
}
