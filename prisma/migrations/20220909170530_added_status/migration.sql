/*
  Warnings:

  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Suggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusType` to the `Suggestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_suggestionId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Suggestion" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "statusType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Status" (
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_type_key" ON "Status"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_statusType_fkey" FOREIGN KEY ("statusType") REFERENCES "Status"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
