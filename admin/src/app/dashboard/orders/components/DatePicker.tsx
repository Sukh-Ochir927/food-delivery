"use client";
import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 5, 13),
    to: new Date(2023, 6, 14),
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 font-normal bg-white hover:bg-gray-50 w-fit"
        >
          <CalendarIcon size={15} className="text-gray-500" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd MMM yyyy")} -{" "}
                {format(date.to, "dd MMM yyyy")}
              </>
            ) : (
              format(date.from, "dd MMM yyyy")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
