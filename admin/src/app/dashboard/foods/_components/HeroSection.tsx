import { getCategories } from "@/lib/api/get-categories";
import { Categories } from "../../orders/types/types";
import { AddFoodButton } from "./AddFoodButton";
import Image from "next/image";

export const HeroSection = async () => {
  const categories: Categories[] = await getCategories();
  return (
    <div className="w-full  flex flex-col gap-4">
      {categories.map((category) => (
        <div key={category.id} className="border-2  rounded-2xl p-5 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="font-semibold">{category.name}</h1>
            <span>({category.foods.length})</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <AddFoodButton key={category.id} category={category} />
            {category.foods.map((food) => (
              <div
                key={food.id}
                className="h-fit w-full border rounded-2xl overflow-hidden"
              >
                <Image
                  src={food.posterPath || "/placeholder.png"}
                  alt={food.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="p-3">
                  <div className="flex justify-between gap-2 mt-1">
                    <h2 className="font-medium text-red-500 text-sm">
                      {food.name}
                    </h2>
                    <p className="text-sm font-medium">₮{food.price}</p>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {food.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
