import { Categories } from "@/app/dashboard/orders/types/types";
import { unstable_rethrow } from "next/navigation";
import { apiUrl, authHeaders, logApiFetchError } from "./config";

export const getCategories = async (): Promise<Categories> => {
  const endpoint = "/categories";
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

    const categories = (await response.json()) as Categories;

    console.info("[admin-foods] /categories response", {
      categoriesCount: categories.length,
      firstCategory: categories[0]
        ? {
            ...categories[0],
            foodsCount: Array.isArray(categories[0].foods)
              ? categories[0].foods.length
              : 0,
            foods: Array.isArray(categories[0].foods)
              ? categories[0].foods.slice(0, 1)
              : [],
          }
        : null,
    });

    return categories;
  } catch (error) {
    unstable_rethrow(error);
    logApiFetchError({ endpoint, url, error });
    return [];
  }
};
