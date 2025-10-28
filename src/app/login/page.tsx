"use client"; // MUST be the very first line

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the router
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the router
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // FIXED: Removed 'data' from destructuring to clear the unused variable error
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Error logging in: " + error.message);
    } else {
      // Login successful!
      // We will create the '/dashboard' page next.
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Log in to Oga Landlord
        </h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 p-3 text-white shadow-sm transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          {/* FIXED: Escaped the apostrophe in "Don't" */}
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}