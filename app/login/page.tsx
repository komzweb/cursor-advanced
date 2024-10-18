"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Github } from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/actions/login";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    try {
      await login(formData);
    } catch (error) {
      setError(
        "ログインに失敗しました。メールアドレスまたはパスワードを確認してください。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    // GitHub認証ロジックをここに実装
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            ログイン
          </CardTitle>
          <CardDescription className="text-center">
            アカウントにログインして学習を始めましょう
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form action={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">パスワード</Label>
                <Button variant="link" className="px-0 text-sm text-blue-500">
                  パスワードを忘れた方
                </Button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">または</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGithubLogin}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHubでログイン
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-gray-600">
            アカウントをお持ちでない方は
            <Link href="/signup">
              <Button variant="link" className="px-1 text-blue-500">
                新規登録
              </Button>
            </Link>
            へ
          </p>
          <Link href="/" className="text-center text-sm text-gray-600">
            ホームに戻る
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
