"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEventHandler } from "react";

export const AddCategoryButton = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    event,
  ) => {
    setCategoryName(event.target.value);
  };

  const addCategory = async () => {
    setLoading(true);
    const body = {
      name: categoryName,
    };
    try {
      await fetch("http://localhost:3001/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-red-500 h-9 w-9 rounded-full flex justify-center items-center text-white">
          <Plus size={16} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold text-[18px]">
            Add new category
          </DialogTitle>
          <DialogDescription className="">Category name</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Category name
            </Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="Type category name"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button onClick={addCategory} type="button" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add category"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
