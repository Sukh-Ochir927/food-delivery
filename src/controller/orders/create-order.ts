import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

type FoodOrder = { foodId: number; quantity: number };

type BodyType = {
  orderedFoods: FoodOrder[];
  userId: number;
};

export const createOrder = async (req: Request, res: Response) => {
  const { userId, orderedFoods }: BodyType = req.body;

  const totalPrice = await priceCalc(orderedFoods);

  try {
    const order = await prisma.foodOrder.create({
      data: {
        userId,
        status: "Pending",
        totalPrice,
        FoodOrderItems: {
          create: orderedFoods,
        },
      },
      include: {
        FoodOrderItems: true,
      },
    });
    res.send(order);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const priceCalc = async (foodOrder: FoodOrder[]) => {
  const foods = await prisma.food.findMany({
    where: {
      id: { in: foodOrder.map((food) => food.foodId) },
    },
  });

  const FoodWithQuantityAndPrice = foods.map((food) => {
    const FoundedOrderItems = foodOrder.find(
      (foodOrder) => foodOrder.foodId === food.id,
    );

    return { ...food, quantity: FoundedOrderItems?.quantity ?? 0 };
  });

  const realTotalPrice = FoodWithQuantityAndPrice.reduce((acc, curr) => {
    return acc + Number(curr.price) * curr.quantity;
  }, 0);

  return realTotalPrice.toString();
};
