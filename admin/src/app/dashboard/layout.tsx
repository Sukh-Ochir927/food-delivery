import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Header } from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "205px" } as React.CSSProperties}
      className="bg-white"
    >
      <AppSidebar />
      <main className="bg-gray-100">
        <Header />

        {children}
      </main>
    </SidebarProvider>
  );
}
