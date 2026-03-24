const getCategoriesUrl = "http://localhost:3001/categories";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MY_TOKEN}`,
  },
};

export const getCategories = async () => {
  const response = await fetch(`${getCategoriesUrl}`, options);

  const category = await response.json();

  console.log(category);

  return category;
};
