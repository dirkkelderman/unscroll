import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">Welcome to Our App</h1>

      <div className="flex gap-4">
        {user ? (
          <Button asChild>
            <Link href="/account">Manage Account</Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="default">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
