import type { Category, Food } from "@/types/menu";
import { FoodCard } from "./FoodCard";

type CategorySectionProps = {
  category: Category;
  onFoodSelect: (food: Food) => void;
  onQuickAdd: (food: Food) => void;
};

export function CategorySection({ category, onFoodSelect, onQuickAdd }: CategorySectionProps) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-black text-white sm:text-3xl">{category.name}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {category.foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onSelect={() => onFoodSelect(food)}
            onQuickAdd={() => onQuickAdd(food)}
          />
        ))}
      </div>
    </section>
  );
}
