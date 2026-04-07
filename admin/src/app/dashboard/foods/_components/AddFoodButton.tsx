"use client";

import { ImageIcon, Plus, X } from "lucide-react";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

import { Categories2 } from "../../orders/types/types";

type Food = {
  name: string;
  price: string;
  foodCategoryId: number;
  description: string;
  posterPath: string;
};

type CategoryProps = {
  category: Categories2;
};

export function AddFoodButton({ category }: CategoryProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [food, setFood] = useState<Food>({
    name: "",
    price: "",
    foodCategoryId: category.id,
    description: "",
    posterPath: "",
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleFoodsChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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
      const response = await fetch(
        "https://food-delivery-lmwy.onrender.com/foods",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response from server:", text);
        alert(
          "Server error - the backend may be starting up. Try again in a moment.",
        );
        return;
      }

      const data = await response.json();
      console.log("Success:", data);

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full h-full border border-red-500 border-dashed rounded-2xl flex flex-col gap-6 p-2 items-center justify-center bg-transparent cursor-pointer hover:bg-red-50 transition-colors"
      >
        <div className="bg-red-500 h-9 w-9 rounded-full flex justify-center items-center text-white">
          <Plus size={16} />
        </div>
        <p className="text-[14px] font-semibold text-center">
          Add new Dish to <br /> {category.name}
        </p>
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-medium text-gray-900 mb-6">
              Add new Dish to {category.name}
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Food name
                  </label>
                  <input
                    onChange={handleFoodsChange}
                    placeholder="Type food name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Food price
                  </label>
                  <input
                    onChange={handleFoodsChange}
                    placeholder="Enter price..."
                    name="price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Ingredients
                </label>
                <input
                  onChange={handleFoodsChange}
                  placeholder="List ingredients..."
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition h-14"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Food image
                </label>

                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={(result) => {
                    const info = result?.info;
                    if (
                      info &&
                      typeof info === "object" &&
                      "secure_url" in info
                    ) {
                      setFood((prev) => ({
                        ...prev,
                        posterPath: (info as { secure_url: string }).secure_url,
                      }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 p-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      {food.posterPath ? (
                        <>
                          <img
                            src={food.posterPath}
                            alt="Uploaded food"
                            className="h-24 w-24 object-cover rounded-lg shadow"
                          />
                          <span className="text-xs text-gray-500 mt-1">
                            Click to change image
                          </span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={28} className="text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Choose a file or drag &amp; drop it here
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="mr-3 px-5 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addFoods}
                className="px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Add Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
