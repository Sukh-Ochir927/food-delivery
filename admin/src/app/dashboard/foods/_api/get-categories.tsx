import { apiUrl } from "@/lib/api/config";

export default async function getCategories() {
  const data = await fetch(apiUrl("/categories"));
  const categories = await data.json();

  return categories;
}
