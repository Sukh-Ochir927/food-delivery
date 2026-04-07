"use client";
import { useState } from "react";
import { ChevronsUpDown, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderTableHeader } from "./OrderTableHeader";
import { Order } from "@/lib/api/get-orders";

const statusStyles: Record<string, string> = {
  Pending: "border border-red-400 text-red-400",
  Delivered: "border border-green-500 text-green-500",
  Cancelled: "border border-gray-400 text-gray-500",
};

export const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="bg-white overflow-hidden flex flex-col rounded-md border">
      <OrderTableHeader totalCount={orders.length} selectedCount={0} />
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 text-gray-200">
            <TableHead className="w-8">
              <Checkbox />
            </TableHead>
            <TableHead>№</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Date <ChevronsUpDown size={14} />
              </div>
            </TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Delivery state <ChevronsUpDown size={14} />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <>
              <TableRow key={order.id} className="hover:bg-gray-100">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.userOrder.email}</TableCell>
                <TableCell>
                  <button
                    className="flex items-center gap-2 "
                    onClick={() =>
                      setExpandedRow(expandedRow === index ? null : index)
                    }
                  >
                    {order.FoodOrderItems.length} foods
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${expandedRow === index ? "rotate-180" : ""}`}
                    />
                  </button>
                </TableCell>
                <TableCell>
                  {new Date(order.createAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  {Number(order.totalPrice).toLocaleString()} ₮
                </TableCell>
                <TableCell className="text-gray-500 max-w-45 truncate">
                  {order.userOrder.name}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${statusStyles[order.status] ?? "border border-gray-400 text-gray-500"}`}
                  >
                    {order.status} <ChevronsUpDown size={12} />
                  </span>
                </TableCell>
              </TableRow>

              {expandedRow === index && (
                <TableRow key={`${order.id}-expanded`}>
                  <TableCell colSpan={8} className="p-0">
                    <div className="ml-48 my-2 bg-white shadow-md rounded-lg w-64 overflow-hidden">
                      {order.FoodOrderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between px-4 py-2 border-b last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            {item.food.posterPath && (
                              <img
                                src={item.food.posterPath}
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <span className="text-sm">{item.food.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            x {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
