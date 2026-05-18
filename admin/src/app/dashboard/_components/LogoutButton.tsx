"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="hidden h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold shadow-sm sm:flex"
    >
      <LogOut size={16} /> Logout
    </button>
  );
}
