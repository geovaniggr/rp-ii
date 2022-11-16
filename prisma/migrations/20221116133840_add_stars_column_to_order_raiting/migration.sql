/*
  Warnings:

  - Added the required column `stars` to the `OrderRaiting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderRaiting" ADD COLUMN     "stars" INTEGER NOT NULL;
