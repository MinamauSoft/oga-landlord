import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <h1 className="mb-4 text-4xl font-bold">Welcome to Oga Landlord</h1>
      <div className="flex space-x-4">
        <Link
          href="/signup"
          className="rounded-md bg-green-600 px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-green-700"
        >
          Go to Signup
        </Link>
        <Link
          href="/login"
          className="rounded-md bg-white px-6 py-3 text-lg font-medium text-green-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-200 hover:bg-gray-50"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}