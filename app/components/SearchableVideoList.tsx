"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

type Video = {
  id: number;
  title: string;
  description: string;
  price: number;
};

type SearchableVideoListProps = {
  videos: Video[];
};

export default function SearchableVideoList({
  videos,
}: SearchableVideoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.price.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="動画を検索..."
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
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
    </div>
  );
}
