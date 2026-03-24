import { Categories } from "../types/types";
import { getCategories } from "@/lib/api/getCategories";

const OrdersTable = async () => {
  const categoriesData: Categories[] = await getCategories();

  return <div>{categoriesData.map((category) => category.name)}</div>;
};

export default OrdersTable;
