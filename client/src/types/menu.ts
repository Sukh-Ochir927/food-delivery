export type Food = {
  id: number;
  name: string;
  price: string;
  FoodCategoryId: number;
  description?: string;
  posterPath?: string;
  createAt?: string;
  updatedAt?: string;
};

export type Category = {
  id: number;
  name: string;
  createAt?: string;
  updatedAt?: string;
  foods: Food[];
};

export type CartItem = {
  food: Food;
  quantity: number;
};
