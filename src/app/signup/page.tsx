"use client"; // MUST be the very first line

import { useState } from "react";
import { createClient } from "@/lib/supabase/client"; // We use the "browser" client

export default function SignUpPage() {
  // Create state variables for our form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This is the "browser phone" we created in Step 13
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from refreshing the page
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // This is how we pass the "full_name" to our trigger
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      alert("Error signing up: " + error.message);
    } else {
      // Supabase sends a confirmation email by default
      alert(
        "Signup successful! Please check your email to confirm your account."
      );
      // Clear the form on success
      setFullName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Create your Oga Landlord account
        </h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="John Doe"
            />
          </div>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}