"use client";
import { usePathname } from "next/navigation";
import { Truck, LayoutGrid } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  const pathname = usePathname();
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
          <Link
            className={`flex gap-2 px-4 h-10 items-center rounded-full font-medium transition-colors ${
              pathname === "/dashboard/orders" ? "bg-black text-white" : ""
            }`}
            href="/dashboard/orders"
          >
            <Truck className="w-5 h-5 shrink-0" />
            Orders
          </Link>
          <Link
            className={`flex gap-2 px-4 h-10 items-center rounded-full font-medium transition-colors ${
              pathname === "/dashboard/foods" ? "bg-black text-white" : ""
            }`}
            href="/dashboard/foods"
          >
            <LayoutGrid className="w-5 h-5 shrink-0" />
            Foods
          </Link>
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
