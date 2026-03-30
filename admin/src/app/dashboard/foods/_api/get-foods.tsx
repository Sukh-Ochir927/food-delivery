export default async function getFoods() {
  const data = await fetch("//http://localhost:3001/foods");
  const foods = await data.json();

  return foods;
}
