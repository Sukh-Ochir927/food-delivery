/*
  Warnings:

  - You are about to drop the column `userId` on the `FoodOrderItem` table. All the data in the column will be lost.
  - Added the required column `userId` to the `FoodOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FoodOrderItem" DROP CONSTRAINT "FoodOrderItem_userId_fkey";

-- AlterTable
ALTER TABLE "FoodOrder" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FoodOrderItem" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "FoodOrder" ADD CONSTRAINT "FoodOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
