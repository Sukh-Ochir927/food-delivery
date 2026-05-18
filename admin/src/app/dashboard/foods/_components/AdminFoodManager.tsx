"use client";

import { useMemo, useState } from "react";
import { Check, ImageIcon, Pencil, Plus, RotateCcw, Trash2, X } from "lucide-react";
import type { Categories2, Food } from "../../orders/types/types";
import { apiUrl } from "@/lib/api/config";
import { uploadImage } from "@/lib/upload-image";

const preferredCategories = [
  "Appetizers",
  "Salads",
  "Pizzas",
  "Lunch favorites",
  "Main dishes",
  "Fish & Sea foods",
  "Brunch",
  "Side dish",
  "Desserts",
  "Beverages",
];

type DishForm = {
  id?: number;
  name: string;
  price: string;
  description: string;
  posterPath: string;
  FoodCategoryId: number;
};

export function AdminFoodManager({ initialCategories }: { initialCategories: Categories2[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [editingDish, setEditingDish] = useState<DishForm | null>(null);
  const [deletedDish, setDeletedDish] = useState<Food | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const normalizedCategories = useMemo(() => {
    const existing = new Map(categories.map((category) => [category.name, category]));

    return preferredCategories.map((name, index) => {
      const category = existing.get(name);
      return (
        category || {
          id: -index - 1,
          name,
          createAt: "",
          updatedAt: "",
          foods: [],
        }
      );
    });
  }, [categories]);

  const totalFoods = categories.reduce((count, category) => count + category.foods.length, 0);
  const visibleCategories =
    activeCategory === "All Dishes"
      ? normalizedCategories
      : normalizedCategories.filter((category) => category.name === activeCategory);

  const refreshCategories = async () => {
    const response = await fetch(apiUrl("/categories"), { cache: "no-store" });
    if (response.ok) {
      setCategories(await response.json());
    }
  };

  const openAddModal = (category: Categories2) => {
    setEditingDish({
      name: "",
      price: "",
      description: "",
      posterPath: "",
      FoodCategoryId: category.id,
    });
  };

  const openEditModal = (food: Food) => {
    setEditingDish({
      id: food.id,
      name: food.name,
      price: food.price,
      description: food.description || "",
      posterPath: food.posterPath || "",
      FoodCategoryId: food.FoodCategoryId,
    });
  };

  const saveDish = async (dish: DishForm) => {
    const isEdit = Boolean(dish.id);
    const response = await fetch(apiUrl(isEdit ? `/foods/${dish.id}` : "/foods"), {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: dish.name,
        price: dish.price,
        description: dish.description,
        posterPath: dish.posterPath,
        FoodCategoryId: dish.FoodCategoryId,
      }),
    });

    if (response.ok) {
      setEditingDish(null);
      await refreshCategories();
    }
  };

  const deleteDish = async (food: Food) => {
    const response = await fetch(apiUrl(`/foods/${food.id}`), { method: "DELETE" });
    if (!response.ok) return;

    setDeletedDish(food);
    setToastOpen(true);
    setCategories((current) =>
      current.map((category) => ({
        ...category,
        foods: category.foods.filter((item) => item.id !== food.id),
      })),
    );
  };

  const undoDelete = async () => {
    if (!deletedDish) return;

    await fetch(apiUrl("/foods"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: deletedDish.name,
        price: deletedDish.price,
        description: deletedDish.description,
        posterPath: deletedDish.posterPath,
        FoodCategoryId: deletedDish.FoodCategoryId,
      }),
    });
    setToastOpen(false);
    setDeletedDish(null);
    await refreshCategories();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-xl font-bold text-[#111827]">Dishes category</h1>
        <div className="flex flex-wrap gap-3">
          <CategoryPill
            active={activeCategory === "All Dishes"}
            count={totalFoods}
            label="All Dishes"
            onClick={() => setActiveCategory("All Dishes")}
          />
          {normalizedCategories.map((category) => (
            <CategoryPill
              key={category.name}
              active={activeCategory === category.name}
              count={category.foods.length}
              label={category.name}
              onClick={() => setActiveCategory(category.name)}
            />
          ))}
        </div>
      </section>

      {visibleCategories.map((category) => (
        <section key={category.name} className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-[#111827]">
            {category.name} ({category.foods.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              disabled={category.id < 0}
              onClick={() => openAddModal(category)}
              className="flex min-h-[270px] flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-[#ef4444] bg-white p-5 text-center text-sm font-semibold text-[#111827] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ef4444] text-white">
                <Plus size={18} />
              </span>
              Add new Dish to <br /> {category.name}
            </button>
            {category.foods.map((food) => (
              <DishCard
                key={food.id}
                food={food}
                onDelete={() => deleteDish(food)}
                onEdit={() => openEditModal(food)}
              />
            ))}
          </div>
        </section>
      ))}

      {editingDish ? (
        <DishModal
          dish={editingDish}
          categoryName={
            normalizedCategories.find((category) => category.id === editingDish.FoodCategoryId)
              ?.name || "Dish"
          }
          onClose={() => setEditingDish(null)}
          onSave={saveDish}
        />
      ) : null}

      {toastOpen ? (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] rounded-2xl border bg-white p-4 shadow-2xl">
          <div className="flex gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-green-100 text-green-700">
              <Check size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-[#111827]">Dish successfully deleted.</p>
              <p className="mt-1 text-sm text-neutral-500">
                Would you like to undo this action?
              </p>
              <button
                type="button"
                onClick={undoDelete}
                className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold"
              >
                <RotateCcw size={14} /> Undo
              </button>
            </div>
            <button type="button" onClick={() => setToastOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CategoryPill({
  active,
  count,
  label,
  onClick,
}: {
  active: boolean;
  count: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active ? "border-[#ef4444] text-[#ef4444]" : "border-neutral-200 text-[#111827]"
      }`}
    >
      {label}
      <span className="rounded-full bg-[#111827] px-2 py-0.5 text-xs font-bold text-white">
        {count}
      </span>
    </button>
  );
}

function DishCard({
  food,
  onDelete,
  onEdit,
}: {
  food: Food;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white p-4">
      <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-neutral-100">
        {food.posterPath ? (
          <img src={food.posterPath} alt={food.name} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-neutral-400">
            <ImageIcon size={34} />
          </div>
        )}
        <button
          type="button"
          aria-label={`Edit ${food.name}`}
          onClick={onEdit}
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-[#ef4444] shadow-lg"
        >
          <Pencil size={16} />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-tight text-[#ef4444]">{food.name}</h3>
        <p className="shrink-0 text-sm font-bold">${food.price}</p>
      </div>
      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-neutral-500">
        {food.description || "No ingredients listed."}
      </p>
      <button
        type="button"
        onClick={onDelete}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-xs font-bold text-[#ef4444]"
      >
        <Trash2 size={14} /> Delete
      </button>
    </article>
  );
}

function DishModal({
  categoryName,
  dish,
  onClose,
  onSave,
}: {
  categoryName: string;
  dish: DishForm;
  onClose: () => void;
  onSave: (dish: DishForm) => void;
}) {
  const [form, setForm] = useState(dish);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-neutral-100"
        >
          <X size={18} />
        </button>
        <h2 className="mb-6 pr-10 text-xl font-bold text-[#111827]">
          {form.id ? "Edit dish" : `Add new Dish to ${categoryName}`}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Food name">
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Type food name"
              className="h-10 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#ef4444]"
            />
          </Field>
          <Field label="Food price">
            <input
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
              placeholder="Enter price"
              className="h-10 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#ef4444]"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Ingredients">
              <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                placeholder="List ingredients..."
                className="min-h-24 w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#ef4444]"
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Food image">
              <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-neutral-50 p-4 text-center text-sm text-neutral-500">
                {form.posterPath ? (
                  <img
                    src={form.posterPath}
                    alt="Dish preview"
                    className="h-28 w-28 rounded-xl object-cover"
                  />
                ) : (
                  <>
                    <ImageIcon size={28} />
                    Choose a file or drag and drop it here
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const posterPath = await uploadImage(file);
                    setForm({ ...form, posterPath });
                  }}
                />
              </label>
              <input
                value={form.posterPath}
                onChange={(event) => setForm({ ...form, posterPath: event.target.value })}
                placeholder="Or paste an image URL"
                className="mt-3 h-10 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#ef4444]"
              />
            </Field>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => onSave(form)}
            className="rounded-full bg-[#111827] px-6 py-2.5 text-sm font-bold text-white"
          >
            {form.id ? "Save Changes" : "Add Dish"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#111827]">{label}</span>
      {children}
    </label>
  );
}
