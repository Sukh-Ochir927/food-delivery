export function numericPrice(price: string) {
  const value = Number.parseFloat(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

export function formatPrice(price: string | number) {
  const value = typeof price === "number" ? price : numericPrice(price);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
