import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "205px" } as React.CSSProperties}
      className="bg-[#f4f4f5]"
    >
      <AppSidebar />
      <main className="min-h-screen w-full bg-[#f4f4f5] p-4 sm:p-6">
        <Header />
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </main>
    </SidebarProvider>
  );
}
