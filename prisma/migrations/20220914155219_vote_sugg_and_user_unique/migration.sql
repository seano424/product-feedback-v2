/*
  Warnings:

  - A unique constraint covering the columns `[suggestionId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_suggestionId_key" ON "Vote"("suggestionId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_key" ON "Vote"("userId");
