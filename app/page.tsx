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
import { PlayCircle, ShoppingCart } from "lucide-react";

export default function Home() {
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
          <Link href="/login">
            <Button>ログイン</Button>
          </Link>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="browse" className="mb-6">
          <TabsList>
            <TabsTrigger value="browse">動画一覧</TabsTrigger>
            <TabsTrigger value="create">動画作成</TabsTrigger>
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

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>新しい動画を作成</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Input id="title" placeholder="動画タイトル" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Input id="description" placeholder="動画説明" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Input id="price" type="number" placeholder="価格" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>動画を公開</Button>
              </CardFooter>
            </Card>
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
