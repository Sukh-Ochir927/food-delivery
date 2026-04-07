export interface Food {
  id: number;
  name: string;
  price: string;
  FoodCategoryId: number;
  description?: string;
  posterPath?: string;
  createAt: string;
  updatedAt: string;
}

export interface FoodOrderItemWithFood extends FoodOrderItems {
  food: Food;
}
export interface FoodOrderItems {
  id: number;
  quantity: number;
  foodId: number;
  foodOrderId: number;
  createAt: string;
  updatedAt: string;
}

export type Order = {
  id: number;
  userId: number;
  totalPrice: string;
  status: string;
  createAt: string;
  updatedAt: string;
  FoodOrderItems: FoodOrderItemWithFood[];
  userOrder: {
    id: number;
    email: string;
    password: string;
    role: string;
    age: number;
    name: string;
  };
};

// export type Orders = Order[];

export type Categories = Categories2[];

export interface Categories2 {
  id: number;
  name: string;
  createAt: string;
  updatedAt: string;
  foods: Food[];
}
