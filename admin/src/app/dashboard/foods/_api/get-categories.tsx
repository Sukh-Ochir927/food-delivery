export default async function getCategories() {
  const data = await fetch("//http://localhost:3001/categories");
  const categories = await data.json();

  return categories;
}
