import { FoodOrderItemWithFood } from "@/app/dashboard/orders/types/types";
import { apiUrl, authHeaders } from "./config";
import { cookies } from "next/headers";

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

export const getOrders = async (): Promise<Order[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(apiUrl("/orders"), {
    cache: "no-store",
    headers: authHeaders(token),
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
};
