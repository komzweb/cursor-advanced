"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function createCheckoutSession(videoId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("ユーザーが認証されていません");
  }

  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("id", videoId)
    .single();

  if (!video) {
    throw new Error("動画が見つかりません");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: video.title,
          },
          unit_amount: video.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    client_reference_id: user.id,
    metadata: {
      videoId: videoId,
    },
    customer_email: user.email,
  });

  if (session.url) {
    redirect(session.url);
  }
}
