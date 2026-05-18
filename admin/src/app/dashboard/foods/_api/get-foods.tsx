import { apiUrl } from "@/lib/api/config";

export default async function getFoods() {
  const data = await fetch(apiUrl("/foods"));
  const foods = await data.json();

  return foods;
}
