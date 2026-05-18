import { Categories } from "@/app/dashboard/orders/types/types";
import { apiUrl, authHeaders } from "./config";

export const getCategories = async (): Promise<Categories> => {
  const response = await fetch(apiUrl("/categories"), {
    cache: "no-store",
    headers: authHeaders(),
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
};
