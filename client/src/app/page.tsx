import { fallbackCategories } from "@/data/fallbackMenu";
import { MenuShell } from "@/components/MenuShell";
import type { Category } from "@/types/menu";
import { apiUrl } from "@/lib/api";

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
      return fallbackCategories;
    }

    return response.json();
  } catch {
    return fallbackCategories;
  }
}
