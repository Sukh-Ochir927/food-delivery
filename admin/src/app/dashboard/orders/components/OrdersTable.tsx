import { getOrders } from "@/lib/api/get-orders";
import { Header } from "./Header";

import { Checkbox } from "@/components/ui/checkbox";

export const OrdersTable = async () => {
  const orders = await getOrders();
  console.log("============= orders : ", orders);

  return (
    <div className="h-screen">
      <Header />
      {orders.map((order) => order.totalPrice)}
    </div>
  );
};
