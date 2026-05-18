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

    return response.json();
  } catch (error) {
    unstable_rethrow(error);
    logApiFetchError({ endpoint, url, error });
    return [];
  }
};
