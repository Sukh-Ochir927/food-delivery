"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Plus } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

import { Categories } from "../../orders/types/types";

type Food = {
  name: string;
  price: string;
  foodCategoryId: number;
  description: string;
  posterPath: string;
};
type CategoryProps = {
  category: Categories;
};

export function AddFoodButton({ category }: CategoryProps) {
  const [food, setFood] = useState<Food>({
    name: "",
    price: "",
    foodCategoryId: category.id,
    description: "",
    posterPath: "",
  });

  const handleFoodsChange: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  const addFoods = async () => {
    const body = {
      name: food.name,
      price: food.price,
      FoodCategoryId: food.foodCategoryId,
      description: food.description,
      posterPath: food.posterPath,
    };
    try {
      await fetch("http://localhost:3001/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full h-full border border-red-500 border-dashed rounded-2xl flex flex-col gap-6 p-2 items-center justify-center">
          <div className=" bg-red-500 h-9 w-9 rounded-full flex justify-center items-center  text-white">
            <Plus size={16} />
          </div>
          <p className="text-[14px] font-semibold">
            Add new Dish to <br /> {category.name}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Add new Dish to
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-medium">Food name</Label>
              <Input
                onChange={handleFoodsChange}
                placeholder="Type food name"
                name="name"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Food price</Label>
              <Input
                onChange={handleFoodsChange}
                placeholder="Enter price..."
                name="price"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Ingredients</Label>
            <Input
              onChange={handleFoodsChange}
              placeholder="List ingredients..."
              className="resize-none h-28"
              name="description"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Food image</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 p-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
              <ImageIcon size={28} className="text-gray-400" />
              <div className="text-sm text-gray-500">
                Choose a file or drag &amp; drop it here
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={addFoods}
            className="bg-black text-white hover:bg-gray-800 px-6"
          >
            Add Dish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
