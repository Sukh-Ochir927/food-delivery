import { getCategories } from "@/lib/api/get-categories";
import { Categories } from "../../orders/types/types";
import { AddCategoryButton } from "./AddCategoryButton";

const CategoriesTable = async () => {
  const categoriesData: Categories[] = await getCategories();
  const totalFoods = categoriesData.reduce(
    (acc, category) => acc + category.foods.length,
    0,
  );

  return (
    <div className="w-full h-fit border-2 rounded-2xl p-5 flex flex-col gap-4 bg-white">
      <h1 className="font-semibold text-xl text-gray-900">Dishes category</h1>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 border-2 rounded-full px-4 py-1.5">
          <div className="text-sm font-medium text-gray-800">All Dishes</div>

          <div className="bg-black text-white text-xs font-semibold rounded-full px-2 py-0.5 min-w-6 text-center">
            {totalFoods}
          </div>
        </div>
        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <div className="text-sm font-medium text-gray-800">
              {category.name}
            </div>
            <div className="bg-black text-white text-xs font-semibold rounded-full px-2 py-0.5 min-w-6 text-center">
              {category.foods.length}
            </div>
          </div>
        ))}
        <AddCategoryButton />
      </div>
    </div>
  );
};

export default CategoriesTable;
