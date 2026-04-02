import { getOrders } from "@/lib/api/get-orders";
import { OrdersTable } from "./components/OrdersTable";


export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div>
      
      <OrdersTable orders={orders} />
    </div>
  );
}
