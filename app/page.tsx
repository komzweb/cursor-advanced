import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const videos = [
    {
      id: 1,
      title: "プログラミング入門",
      description:
        "プログラミングの基礎を学び、簡単なアプリケーションを作成する方法を習得します。",
      price: 5000,
    },
    {
      id: 2,
      title: "データサイエンス基礎",
      description:
        "データ分析の基本概念と手法を学び、実際のデータセットを使って実践的なスキルを身につけます。",
      price: 7000,
    },
    {
      id: 3,
      title: "ウェブデザイン実践",
      description:
        "最新のウェブデザインのトレンドと技術を学び、魅力的なウェブサイトを作成するスキルを習得します。",
      price: 6000,
    },
  ];

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
            <div className="mb-4">
              <Input
                type="text"
                placeholder="動画を検索..."
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardHeader>
                    <CardTitle>{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>価格: {video.price}円</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" /> 購入する
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-videos">
            <h2 className="text-2xl font-semibold mb-4">受講中の動画</h2>
            <div className="space-y-4">
              {videos.slice(0, 2).map((video) => (
                <Card key={video.id}>
                  <CardHeader>
                    <CardTitle>{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <progress value="60" max="100" className="w-full" />
                    <p className="text-sm text-gray-500 mt-2">進捗: 60%</p>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <PlayCircle className="mr-2 h-4 w-4" /> 続きから学習
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
