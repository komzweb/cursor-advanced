import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // セッションからユーザーIDとビデオIDを取得
    const userId = session.client_reference_id;
    const videoId = session.metadata?.videoId;

    if (!userId || !videoId) {
      return NextResponse.json(
        { error: "Missing user ID or video ID" },
        { status: 400 }
      );
    }

    // 購入情報をデータベースに挿入
    const { error } = await supabaseAdmin.from("purchases").insert({
      user_id: userId,
      video_id: videoId,
      stripe_payment_id: session.payment_intent as string,
    });

    if (error) {
      console.error("Error inserting purchase:", error);
      return NextResponse.json(
        { error: "Failed to record purchase" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
