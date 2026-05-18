import type { Food } from "@/types/menu";
import { formatPrice } from "@/components/price";
import Image from "next/image";

type FoodCardProps = {
  food: Food;
  onSelect: () => void;
  onQuickAdd: () => void;
};

export function FoodCard({ food, onSelect, onQuickAdd }: FoodCardProps) {
  return (
    <article
      className="group overflow-hidden rounded-3xl bg-white p-4 text-[#171717] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:shadow-2xl"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
        {food.posterPath ? (
          <Image
            src={food.posterPath}
            alt={food.name}
            fill
            unoptimized
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-neutral-200 text-4xl font-black text-neutral-400">
            {food.name.slice(0, 1)}
          </div>
        )}
        <button
          type="button"
          aria-label={`Add ${food.name}`}
          className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-[#ef4444] text-3xl font-light leading-none text-white shadow-lg transition hover:bg-[#d92323]"
          onClick={(event) => {
            event.stopPropagation();
            onQuickAdd();
          }}
        >
          +
        </button>
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-black leading-tight text-[#ef4444]">{food.name}</h3>
        <p className="shrink-0 text-base font-black">{formatPrice(food.price)}</p>
      </div>
      <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-neutral-600">
        {food.description || "Chef prepared favorite ready for delivery."}
      </p>
    </article>
  );
}
