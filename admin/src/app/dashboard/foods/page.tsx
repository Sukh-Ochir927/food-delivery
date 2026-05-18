import { getCategories } from "@/lib/api/get-categories";
import { AdminFoodManager } from "./_components/AdminFoodManager";

export default async function FoodsPage() {
  const categories = await getCategories();

  return <AdminFoodManager initialCategories={categories} />;
}
