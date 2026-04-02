import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./DatePicker";
import { getOrders } from "@/lib/api/get-orders";

export type Orders = {
  id: number;
  userId: number;
  totalPrice: string;
  status: string;
  createAt: string;
  updatedAt: string;
};

export const Header = async () => {
  const orders: Orders[] = await getOrders();
  return (
    <div className="flex">
      <div>
        <h1 className="font-semibold">Orders</h1>
        <p>{orders.length} Items</p>
      </div>
      <DatePickerWithRange />
      <Button>Change Delivery State</Button>
    </div>
  );
};
