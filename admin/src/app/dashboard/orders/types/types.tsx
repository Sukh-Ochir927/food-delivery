export type RootFoodOrderList = Categories[];

export interface Categories {
  id: number;
  name: string;
  createAt: string;
  updatedAt: string;
  foods: Food[];
}

export interface Food {
  id: number;
  name: string;
  price: string;
  FoodCategoryId: number;
  description?: string;
  posterPath?: string;
  createAt: string;
  updatedAt: string;
  foodOrderItem: FoodOrderItem[];
}

export interface FoodOrderItem {
  id: number;
  quantity: number;
  foodId: number;
  foodOrderId: number;
  createAt: string;
  updatedAt: string;
}
