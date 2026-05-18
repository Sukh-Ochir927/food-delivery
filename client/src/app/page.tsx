import { fallbackCategories } from "@/data/fallbackMenu";
import { MenuShell } from "@/components/MenuShell";
import type { Category } from "@/types/menu";
import { apiUrl, logApiFetchError } from "@/lib/api";
import { unstable_rethrow } from "next/navigation";

export default async function Home() {
  const categories = await getCategories();

  return <MenuShell categories={categories} />;
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(apiUrl("/categories"), {
      cache: "no-store",
    });

    if (!response.ok) {
      logApiFetchError({
        endpoint: "/categories",
        url: apiUrl("/categories"),
        status: response.status,
      });
      return fallbackCategories;
    }

    return response.json();
  } catch (error) {
    unstable_rethrow(error);
    logApiFetchError({
      endpoint: "/categories",
      url: apiUrl("/categories"),
      error,
    });
    return fallbackCategories;
  }
}
