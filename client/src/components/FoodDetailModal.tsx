"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Food } from "@/types/menu";
import { formatPrice, numericPrice } from "./price";

type FoodDetailModalProps = {
  food: Food;
  onClose: () => void;
  onAddToCart: (food: Food, quantity: number) => void;
};

export function FoodDetailModal({ food, onClose, onAddToCart }: FoodDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const total = useMemo(() => numericPrice(food.price) * quantity, [food.price, quantity]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white text-[#171717] shadow-2xl md:grid-cols-[1fr_1fr]">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-xl font-bold shadow-lg"
        >
          x
        </button>

        <div className="relative min-h-[280px] bg-neutral-100 md:min-h-[520px]">
          {food.posterPath ? (
            <Image
              src={food.posterPath}
              alt={food.name}
              fill
              unoptimized
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-6xl font-black text-neutral-300">
              {food.name.slice(0, 1)}
            </div>
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex-1">
            <h2 className="pr-12 text-3xl font-black leading-tight text-[#ef4444]">
              {food.name}
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600">
              {food.description || "Freshly prepared and packed for delivery."}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-neutral-500">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 text-xl font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center text-lg font-black">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#ef4444] text-xl font-bold text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-lg font-black">
              <span>Total price</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(food, quantity)}
              className="h-14 w-full rounded-full bg-[#ef4444] text-base font-black text-white transition hover:bg-[#d92323]"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
