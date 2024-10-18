import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/logout";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <p>こんにちは、{data.user.email}さん</p>
      <form action={logout}>
        <button type="submit">ログアウト</button>
      </form>
    </div>
  );
}
