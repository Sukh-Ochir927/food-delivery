import Image from "next/image";

export default async function Home() {
  const response = await fetch("http://localhost:3001/categories");
  const categories: Category[] = await response.json();


  type Food = {
    id: number;
    name: string;
    price: string;
    FoodCategoryId: number;
    description?: string;
    posterPath?: string;
    createAt: string;
    updatedAt: string;
  };

  type Category = {
    id: number;
    name: string;
    createAt: string;
    updatedAt: string;
    foods: Food[];
  };

  return (
    <div className="mb-8">
      <div className="bg-gray-50 min-h-screen p-4">
        {categories.map((category) => (
          <div key={category.id}>
            <h2 className="font-bold text-[20px]">{category.name}</h2>
            <div className="w-[397px] h-[342px] bg-white">
              {category.foods.map((food) => (
                <div key={food.id}>
                  <img src={food.posterPath} alt={food.name} />
                  <div className="flex gap-2">
                    {" "}
                    <h3>{food.name}</h3>
                    <p>{food.price}</p>
                  </div>
                  <p>{food.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
