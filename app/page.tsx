import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayCircle, ShoppingCart, PlusCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SearchableVideoList from "./components/SearchableVideoList";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // すべての動画を取得
  const { data: allVideos, error: allVideosError } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  if (allVideosError) {
    console.error("動画の取得に失敗しました:", allVideosError);
  }

  // ユーザーが購入した動画を取得
  let purchasedVideos = [];
  if (user) {
    const { data: purchases, error: purchasesError } = await supabase
      .from("purchases")
      .select("video_id")
      .eq("user_id", user.id);

    if (purchasesError) {
      console.error("購入履歴の取得に失敗しました:", purchasesError);
    } else {
      const purchasedVideoIds = purchases.map((purchase) => purchase.video_id);
      purchasedVideos =
        allVideos?.filter((video) => purchasedVideoIds.includes(video.id)) ??
        [];
    }
  }

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">TechTube</h1>
          <div className="flex space-x-2">
            <Link href="/new">
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                動画作成
              </Button>
            </Link>
            {user ? (
              <Link href="/private">
                <Button variant="outline">{user.email}</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button>ログイン</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="browse" className="mb-6">
          <TabsList>
            <TabsTrigger value="browse">動画一覧</TabsTrigger>
            <TabsTrigger value="my-videos">マイ動画</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <SearchableVideoList videos={allVideos || []} />
          </TabsContent>

          <TabsContent value="my-videos">
            <h2 className="text-2xl font-semibold mb-4">購入済みの動画</h2>
            <div className="space-y-4">
              {purchasedVideos.map((video) => (
                <Card key={video.id}>
                  <CardHeader>
                    <CardTitle>{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* ここに動画の再生進捗などを表示できます */}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/watch/${video.id}`}>
                      <Button>
                        <PlayCircle className="mr-2 h-4 w-4" /> 視聴する
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
              {purchasedVideos.length === 0 && (
                <p>購入済みの動画はありません。</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
