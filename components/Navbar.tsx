"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-pink-100 dark:bg-[#2d2a32] shadow-md dark:shadow-pink-900 px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-extrabold text-pink-600 dark:text-pink-400 tracking-wide hover:opacity-90 transition"
        >
          News Portal
        </Link>

        <div className="flex gap-4 items-center">
          {pathname !== "/login" && !session && (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow transition"
            >
              Login
            </Link>
          )}
          {session && (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-semibold shadow transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
