import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/api/get-user";
import { LogoutButton } from "./LogoutButton";

export const Header = async () => {
  const data = await getUser();
  const displayName = data?.name || "Admin";

  return (
    <div className="mb-6 flex items-center justify-between">
      <SidebarTrigger className="rounded-full bg-white shadow-sm" />
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-bold shadow-sm">
          {displayName.slice(0, 1)}
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
