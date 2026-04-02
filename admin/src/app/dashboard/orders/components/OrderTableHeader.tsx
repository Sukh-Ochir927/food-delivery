import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./DatePicker";

interface OrderTableHeaderProps {
  totalCount: number;
  selectedCount: number;
}

export const OrderTableHeader = ({
  totalCount,
  selectedCount,
}: OrderTableHeaderProps) => {
  return (
    <div className="flex justify-between px-4 py-3 border-b">
      <div className="flex flex-col">
        <h1 className="font-bold text-lg">Orders</h1>
        <p className="text-sm text-gray-500">{totalCount} items</p>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <DatePickerWithRange />
        <Button className="bg-black text-white rounded-full px-5 py-2 flex items-center gap-2 hover:bg-gray-800">
          Change delivery state
          {selectedCount > 0 && (
            <span className="bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {selectedCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
