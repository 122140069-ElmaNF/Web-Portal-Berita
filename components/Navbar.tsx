// components/Navbar.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        News Portal
      </Link>
      <div>
        {session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
