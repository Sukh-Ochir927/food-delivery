import type { Food } from "@/app/dashboard/orders/types/types";
import { unstable_rethrow } from "next/navigation";
import { apiUrl, authHeaders, logApiFetchError } from "./config";

export const getFoods = async (): Promise<Food[]> => {
  const endpoint = "/foods";
  const url = apiUrl(endpoint);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: authHeaders(),
    });

    if (!response.ok) {
      logApiFetchError({ endpoint, url, status: response.status });
      return [];
    }

    const foods = (await response.json()) as Food[];

    console.info("[admin-foods] /foods response", {
      foodsCount: foods.length,
      firstFood: foods[0] ?? null,
    });

    return foods;
  } catch (error) {
    unstable_rethrow(error);
    logApiFetchError({ endpoint, url, error });
    return [];
  }
};
