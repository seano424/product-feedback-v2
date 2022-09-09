/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Suggestion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Suggestion_title_key" ON "Suggestion"("title");
