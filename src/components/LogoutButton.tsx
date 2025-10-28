"use client"; // This MUST be a client component for onClick

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // Use the browser client

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    } else {
      // Push to login page and refresh the page to clear the session
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-md bg-gray-200 px-6 py-3 text-lg font-medium text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-200 hover:bg-gray-300"
    >
      Sign Out
    </button>
  );
}