"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function VideoPlayer({
  videoId,
  filePath,
}: {
  videoId: string;
  filePath: string;
}) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const supabase = createClient();

  const getSignedUrl = async () => {
    const { data } = await supabase.storage
      .from("videos")
      .createSignedUrl(filePath, 3600);
    if (data) {
      setSignedUrl(data.signedUrl);
    }
  };

  useEffect(() => {
    getSignedUrl();
    const interval = setInterval(getSignedUrl, 3000000); // 50分ごとに更新
    return () => clearInterval(interval);
  }, [videoId, filePath]);

  if (!signedUrl) {
    return <div>動画を読み込んでいます...</div>;
  }

  return (
    <video src={signedUrl} controls className="w-full max-w-3xl mx-auto">
      お使いのブラウザは動画タグをサポートしていません。
    </video>
  );
}
