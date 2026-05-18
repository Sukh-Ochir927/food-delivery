import { getCategories } from "@/lib/api/get-categories";
import { getFoods } from "@/lib/api/get-foods";
import { AdminFoodManager } from "./_components/AdminFoodManager";

export default async function FoodsPage() {
  const [categories, foods] = await Promise.all([getCategories(), getFoods()]);

  return <AdminFoodManager initialCategories={categories} initialFoods={foods} />;
}
