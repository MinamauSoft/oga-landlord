import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"; // We need the server client
import LogoutButton from "@/components/LogoutButton"; // We will create this next

export default async function DashboardPage() {
  // Create the server client
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is logged in, redirect to the login page
  if (!user) {
    redirect("/login");
  }

  // Get the user's full name from our 'profiles' table
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  // Handle potential errors (e.g., profile not found)
  if (error || !profile) {
    console.error("Error fetching profile:", error);
    // If we can't get the profile, sign them out just in case
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Oga Landlord
        </h1>
        <p className="mt-2 text-2xl text-gray-700">
          You are logged in as:{" "}
          <strong className="text-green-600">{profile.full_name}</strong>
        </p>

        <div className="mt-8">
          {/* We'll add the logout button component here */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}