import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import VideoPlayer from "./VideoPlayer";

export default async function WatchPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>ログインしてください。</div>;
  }

  const { data: video, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !video) {
    notFound();
  }

  const { data: purchase } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", user.id)
    .eq("video_id", video.id)
    .single();

  if (!purchase) {
    return <div>この動画を視聴する権限がありません。</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <VideoPlayer videoId={video.id} filePath={video.file_path} />
      <p className="mt-4">{video.description}</p>
    </div>
  );
}
