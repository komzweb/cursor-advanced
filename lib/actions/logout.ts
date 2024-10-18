"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
