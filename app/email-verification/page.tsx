import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";

const EmailVerificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            メールをご確認ください
          </CardTitle>
          <CardDescription className="text-center">
            example@email.com 宛に確認メールを送信しました
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>
              メール内のリンクをクリックして、アカウントを有効化してください。
            </p>
            <p>メールが届かない場合は、迷惑メールフォルダもご確認ください。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
