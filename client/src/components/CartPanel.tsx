"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { CartItem } from "@/types/menu";
import { formatPrice, numericPrice } from "./price";

type CartPanelProps = {
  address: string;
  addressTouched: boolean;
  cartItems: CartItem[];
  onAddressChange: (address: string) => void;
  onAddressTouched: () => void;
  onCheckout: () => void;
  onRemoveItem: (foodId: number) => void;
  onUpdateQuantity: (foodId: number, quantity: number) => void;
};

export function CartPanel({
  address,
  addressTouched,
  cartItems,
  onAddressChange,
  onAddressTouched,
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
}: CartPanelProps) {
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");
  const itemsTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + numericPrice(item.food.price) * item.quantity,
        0,
      ),
    [cartItems],
  );
  const shipping = cartItems.length > 0 ? 2.99 : 0;
  const addressHasError = addressTouched && address.trim().length === 0;
  const checkoutDisabled = cartItems.length === 0;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 max-h-[76vh] overflow-y-auto rounded-t-3xl bg-[#f7f7f7] p-4 text-[#171717] shadow-2xl xl:inset-x-auto xl:bottom-8 xl:right-8 xl:top-24 xl:max-h-none xl:w-[372px] xl:rounded-3xl xl:p-5">
      <h2 className="mb-4 text-2xl font-black">Order detail</h2>

      <div className="mb-5 grid grid-cols-2 rounded-full bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab("cart")}
          className={`h-11 rounded-full text-sm font-black ${
            activeTab === "cart" ? "bg-[#ef4444] text-white" : "text-neutral-500"
          }`}
        >
          Cart
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("order")}
          className={`h-11 rounded-full text-sm font-black ${
            activeTab === "order" ? "bg-[#ef4444] text-white" : "text-neutral-500"
          }`}
        >
          Order
        </button>
      </div>

      {activeTab === "cart" ? (
        <div className="space-y-5">
          <section className="rounded-3xl bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-black">My cart</h3>
            {cartItems.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-neutral-300 p-4 text-sm font-semibold text-neutral-500">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.food.id} className="grid grid-cols-[72px_1fr] gap-3">
                    <div className="relative h-[72px] overflow-hidden rounded-2xl bg-neutral-100">
                      {item.food.posterPath ? (
                        <Image
                          src={item.food.posterPath}
                          alt={item.food.name}
                          fill
                          unoptimized
                          sizes="72px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-[#ef4444]">
                            {item.food.name}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                            {item.food.description || "Freshly prepared item."}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.food.name}`}
                          onClick={() => onRemoveItem(item.food.id)}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#ef4444] text-sm font-bold text-[#ef4444]"
                        >
                          x
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.food.id, item.quantity - 1)}
                            className="grid h-8 w-8 place-items-center rounded-full border border-neutral-300 font-bold"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-sm font-black">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.food.id, item.quantity + 1)}
                            className="grid h-8 w-8 place-items-center rounded-full bg-neutral-900 font-bold text-white"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-black">
                          {formatPrice(numericPrice(item.food.price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <DeliveryLocation
            address={address}
            addressHasError={addressHasError}
            onAddressChange={onAddressChange}
            onAddressTouched={onAddressTouched}
          />

          <PaymentInfo
            checkoutDisabled={checkoutDisabled}
            itemsTotal={itemsTotal}
            shipping={shipping}
            onCheckout={onCheckout}
          />
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-4 text-sm font-semibold leading-6 text-neutral-500 shadow-sm">
          Your placed orders will appear here after checkout.
        </div>
      )}
    </aside>
  );
}

function DeliveryLocation({
  address,
  addressHasError,
  onAddressChange,
  onAddressTouched,
}: {
  address: string;
  addressHasError: boolean;
  onAddressChange: (address: string) => void;
  onAddressTouched: () => void;
}) {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-black">Delivery location</h3>
      <textarea
        value={address}
        onBlur={onAddressTouched}
        onChange={(event) => onAddressChange(event.target.value)}
        placeholder="Add your delivery address"
        className={`min-h-20 w-full resize-none rounded-2xl border bg-white p-3 text-sm font-semibold outline-none transition placeholder:text-neutral-400 ${
          addressHasError ? "border-[#ef4444]" : "border-neutral-200 focus:border-[#ef4444]"
        }`}
      />
      {addressHasError ? (
        <p className="mt-2 text-sm font-bold text-[#ef4444]">Please complete your address</p>
      ) : null}
    </section>
  );
}

function PaymentInfo({
  checkoutDisabled,
  itemsTotal,
  shipping,
  onCheckout,
}: {
  checkoutDisabled: boolean;
  itemsTotal: number;
  shipping: number;
  onCheckout: () => void;
}) {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-black">Payment info</h3>
      <div className="space-y-3 text-sm font-semibold text-neutral-500">
        <div className="flex justify-between">
          <span>Items total</span>
          <span className="font-black text-[#171717]">{formatPrice(itemsTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-black text-[#171717]">{formatPrice(shipping)}</span>
        </div>
        <div className="border-t border-dashed border-neutral-300 pt-3" />
        <div className="flex justify-between text-base text-[#171717]">
          <span className="font-black">Total</span>
          <span className="font-black">{formatPrice(itemsTotal + shipping)}</span>
        </div>
      </div>
      <button
        type="button"
        disabled={checkoutDisabled}
        onClick={onCheckout}
        className="mt-5 h-13 w-full rounded-full bg-[#ef4444] text-sm font-black text-white transition hover:bg-[#d92323] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
      >
        Checkout
      </button>
    </section>
  );
}
