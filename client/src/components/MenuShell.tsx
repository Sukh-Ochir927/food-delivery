"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { CartItem, Category, Food } from "@/types/menu";
import { CartPanel } from "./CartPanel";
import { CategorySection } from "./CategorySection";
import { FoodDetailModal } from "./FoodDetailModal";
import { Footer } from "./Footer";
import { LoginRequiredModal } from "./LoginRequiredModal";
import { Navbar } from "./Navbar";

type MenuShellProps = {
  categories: Category[];
};

export function MenuShell({ categories }: MenuShellProps) {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [addressTouched, setAddressTouched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [toast, setToast] = useState("");

  const heroFood = useMemo(
    () => categories.flatMap((category) => category.foods).find((food) => food.posterPath),
    [categories],
  );

  const addFoodToCart = (food: Food, quantity: number) => {
    if (!isLoggedIn) {
      setShowLoginRequired(true);
      return;
    }

    setCartItems((items) => {
      const existingItem = items.find((item) => item.food.id === food.id);

      if (!existingItem) {
        return [...items, { food, quantity }];
      }

      return items.map((item) =>
        item.food.id === food.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });

    setSelectedFood(null);
    setToast("Food is being added to the cart!");
    window.setTimeout(() => setToast(""), 2200);
  };

  const updateCartQuantity = (foodId: number, quantity: number) => {
    setCartItems((items) =>
      quantity <= 0
        ? items.filter((item) => item.food.id !== foodId)
        : items.map((item) => (item.food.id === foodId ? { ...item, quantity } : item)),
    );
  };

  const removeCartItem = (foodId: number) => {
    setCartItems((items) => items.filter((item) => item.food.id !== foodId));
  };

  const requireLoginThen = (food: Food) => {
    setSelectedFood(food);
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <Navbar address={address} cartCount={cartItems.length} onAddressChange={setAddress} />

      <main className="mx-auto flex w-full max-w-[1440px] gap-8 px-4 pb-[620px] pt-24 sm:px-6 lg:px-8 xl:pb-16 xl:pr-[420px]">
        <div className="min-w-0 flex-1 space-y-10">
          <section className="relative overflow-hidden rounded-3xl bg-[#d92323] shadow-2xl shadow-black/30">
            {heroFood?.posterPath ? (
              <Image
                src={heroFood.posterPath}
                alt=""
                fill
                unoptimized
                sizes="100vw"
                className="object-cover opacity-35"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-[#d92323] via-[#d92323]/90 to-black/30" />
            <div className="relative flex min-h-[300px] items-center px-6 py-12 sm:px-10 lg:min-h-[380px] lg:px-14">
              <div className="max-w-xl">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-white/80">
                  NomNom delivery
                </p>
                <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                  Fresh food, fast to your door.
                </h1>
                <p className="mt-5 max-w-md text-base leading-7 text-white/85 sm:text-lg">
                  Pick a favorite, set your delivery address, and keep your order details in view.
                </p>
              </div>
            </div>
          </section>

          <div className="space-y-10">
            {categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                onFoodSelect={requireLoginThen}
                onQuickAdd={requireLoginThen}
              />
            ))}
          </div>
        </div>
      </main>

      <CartPanel
        address={address}
        addressTouched={addressTouched}
        cartItems={cartItems}
        onAddressChange={setAddress}
        onAddressTouched={() => setAddressTouched(true)}
        onCheckout={() => setAddressTouched(true)}
        onRemoveItem={removeCartItem}
        onUpdateQuantity={updateCartQuantity}
      />

      <Footer />

      {selectedFood ? (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onAddToCart={addFoodToCart}
        />
      ) : null}

      {showLoginRequired ? (
        <LoginRequiredModal
          onClose={() => setShowLoginRequired(false)}
          onLogin={() => {
            setIsLoggedIn(true);
            setShowLoginRequired(false);
          }}
          onSignup={() => {
            setIsLoggedIn(true);
            setShowLoginRequired(false);
          }}
        />
      ) : null}

      {toast ? (
        <div className="fixed right-4 top-24 z-50 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#171717] shadow-2xl">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
