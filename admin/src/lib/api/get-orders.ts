import { Orders } from "@/app/dashboard/orders/components/Header";

const getOrderUrl = "http://localhost:3001/orders";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MY_TOKEN}`,
  },
};

export const getOrders = async (): Promise<Orders[]> => {
  const response = await fetch(`${getOrderUrl}`, options);

  const orders = await response.json();

  console.log(orders);

  return orders;
};
