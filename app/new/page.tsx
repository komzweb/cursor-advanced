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
import { createClient } from "@/lib/supabase/server";
import { createVideo } from "@/lib/actions/new";
import { redirect } from "next/navigation";

export default async function NewVideo() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: userData } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!userData?.is_admin) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>新しい動画を作成</CardTitle>
          <CardDescription>
            動画の詳細を入力してアップロードしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createVideo}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="title"
                  name="title"
                  placeholder="動画タイトル"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="description"
                  name="description"
                  placeholder="動画説明"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="価格"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="video"
                  name="video"
                  type="file"
                  accept="video/*"
                  required
                />
              </div>
            </div>
            <CardFooter className="mt-4">
              <Button type="submit">動画を公開</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
