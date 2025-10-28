import { Database } from "@/database.types";
import { Insert, Update } from ".";
import { supabase } from "../lib/supabase";

type Tag = Database["public"]["Tables"]["tag"]["Row"];
type TagInsert = Insert<"tag">;
type TagUpdate = Update<"tag">;

export async function getTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tag")
    .select("*")

  if (error) {
    console.error("Failed to fetch tags:", error.message);
    return [];
  }

  return data;
}

export async function createTag(data: TagInsert) {
  return await supabase.from("tag").insert(data);
}

export async function deleteTag(tagId: number) {
    return await supabase.from('tag').delete().eq("id", tagId)
}

export async function updateTag(tagId: number, data: TagUpdate) {
    return await supabase.from('tag').update(data).eq('id', tagId)
}

