"use client";
import { usePathname, useRouter } from "next/navigation";
import { Truck, LayoutGrid, Loader2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useState, useTransition } from "react";

const navItems = [
  { href: "/dashboard/orders", label: "Orders", icon: Truck },
  { href: "/dashboard/foods", label: "Foods", icon: LayoutGrid },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const handleNavigate = (href: string) => {
    if (pathname === href) return;
    setLoadingPath(href);
    startTransition(() => {
      router.push(href);
    });
  };

  if (!isPending && loadingPath) {
    setLoadingPath(null);
  }

  return (
    <Sidebar className="bg-white">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <Image
            src="/foodDeliveryLogo.png"
            alt="Logo"
            width={36}
            height={29}
            priority
          />
          <div className="flex flex-col">
            <h1 className="text-[18px] font-semibold">NomNom</h1>
            <p className="text-[12px] text-gray-500 font-medium">
              Swift Delivery
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-10">
        <div className="flex flex-col gap-2 px-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            const isLoading = loadingPath === href && isPending;
            return (
              <button
                key={href}
                onClick={() => handleNavigate(href)}
                disabled={isPending}
                className={`flex gap-2 px-4 h-10 items-center rounded-full font-medium transition-colors w-full
                  ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}
                  ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5 shrink-0" />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
