import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/api/get-user";

export const Header = async () => {
  const data = await getUser();

  return (
    <div className="flex items-center justify-between mb-4">
      <SidebarTrigger />
      <h1 className="text-2xl font-bold">{data.name}</h1>
    </div>
  );
};
