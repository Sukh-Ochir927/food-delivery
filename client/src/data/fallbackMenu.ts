import type { Category } from "@/types/menu";

export const fallbackCategories: Category[] = [
  {
    id: 1,
    name: "Appetizers",
    foods: [
      {
        id: 101,
        name: "Crispy Chicken Bites",
        price: "12.99",
        FoodCategoryId: 1,
        description: "Golden chicken pieces with a tangy house dip.",
        posterPath:
          "https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 102,
        name: "Loaded Fries",
        price: "9.99",
        FoodCategoryId: 1,
        description: "Crisp fries topped with cheese, herbs, and sauce.",
        posterPath:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 103,
        name: "Mini Sliders",
        price: "14.50",
        FoodCategoryId: 1,
        description: "Three soft buns filled with juicy beef and pickles.",
        posterPath:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: 2,
    name: "Salads",
    foods: [
      {
        id: 201,
        name: "Garden Bowl",
        price: "10.99",
        FoodCategoryId: 2,
        description: "Leafy greens, cherry tomatoes, cucumber, and seeds.",
        posterPath:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 202,
        name: "Caesar Crunch",
        price: "11.99",
        FoodCategoryId: 2,
        description: "Romaine, parmesan, grilled chicken, and croutons.",
        posterPath:
          "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 203,
        name: "Avocado Fresh",
        price: "13.25",
        FoodCategoryId: 2,
        description: "Avocado, greens, egg, citrus dressing, and herbs.",
        posterPath:
          "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: 3,
    name: "Lunch favorites",
    foods: [
      {
        id: 301,
        name: "Classic Cheeseburger",
        price: "15.99",
        FoodCategoryId: 3,
        description: "Beef patty, cheddar, lettuce, tomato, and special sauce.",
        posterPath:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 302,
        name: "Spicy Noodles",
        price: "13.99",
        FoodCategoryId: 3,
        description: "Wok tossed noodles with vegetables and chili oil.",
        posterPath:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 303,
        name: "Margherita Pizza",
        price: "16.50",
        FoodCategoryId: 3,
        description: "Tomato, mozzarella, basil, and olive oil.",
        posterPath:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];
