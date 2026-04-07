import { FoodOrderItemWithFood } from "@/app/dashboard/orders/types/types";

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

const getOrderUrl = "http://localhost:3001/orders";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MY_TOKEN}`,
  },
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${getOrderUrl}`, options);

  const orders = await response.json();

  return orders;
};
