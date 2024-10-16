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

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleEmailSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const handleGithubSignup = () => {
    setIsLoading(true);
    // GitHub認証ロジックをここに実装
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            アカウント作成
          </CardTitle>
          <CardDescription className="text-center">
            必要な情報を入力して、学習を始めましょう
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={isLoading}
                value={form.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                required
                disabled={isLoading}
                value={form.password}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                8文字以上で、英字、数字を含める必要があります
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "登録中..." : "アカウントを作成"}
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
            onClick={handleGithubSignup}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHubで登録
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-gray-600 w-full">
            既にアカウントをお持ちの方は
            <Link href="/login">
              <Button variant="link" className="px-1 text-blue-500">
                ログイン
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

export default SignupPage;
