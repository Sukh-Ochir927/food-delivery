import { Categories } from "@/app/dashboard/orders/types/types";

const getCategoriesUrl = "http://localhost:3001/categories";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MY_TOKEN}`,
  },
};

export const getCategories = async (): Promise<Categories[]> => {
  const response = await fetch(`${getCategoriesUrl}`, options);

  const category = await response.json();

  return category;
};
