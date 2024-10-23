import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PurchaseSuccessPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">購入が完了しました</h1>
      <p className="mb-8">
        ありがとうございます。動画の視聴をお楽しみください。
      </p>
      <Link href="/">
        <Button>ホームに戻る</Button>
      </Link>
    </div>
  );
}
