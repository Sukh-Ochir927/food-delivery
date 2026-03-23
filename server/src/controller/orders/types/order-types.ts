export type FoodOrder = { foodId: number; quantity: number };

export type BodyType = {
  orderedFoods: FoodOrder[];
  userId: number;
};
