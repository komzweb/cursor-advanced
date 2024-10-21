"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVideo(formData: FormData) {
  const supabase = createClient();

  // ユーザーの認証と管理者権限の確認
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("認証されていません");
  }

  const { data: userData } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!userData?.is_admin) {
    throw new Error("管理者権限がありません");
  }

  // フォームデータの取得
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const videoFile = formData.get("video") as File;

  if (!title || !price || !videoFile) {
    throw new Error("必須フィールドが入力されていません");
  }

  // ファイル名の安全な形式への変換
  const safeFileName = encodeURIComponent(videoFile.name).replace(/%/g, "_");

  // 動画ファイルのアップロード
  const { data: fileData, error: fileError } = await supabase.storage
    .from("videos")
    .upload(`${user.id}-${Date.now()}-${safeFileName}`, videoFile);

  if (fileError) {
    throw new Error("動画のアップロードに失敗しました");
  }

  // データベースに動画情報を保存
  const { error: dbError } = await supabase.from("videos").insert({
    title,
    description,
    price,
    file_path: fileData.path,
    user_id: user.id,
  });

  if (dbError) {
    throw new Error("動画情報の保存に失敗しました");
  }

  revalidatePath("/");
  redirect("/");
}
