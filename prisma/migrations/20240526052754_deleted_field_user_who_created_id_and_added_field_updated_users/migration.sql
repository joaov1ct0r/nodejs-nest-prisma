/*
  Warnings:

  - You are about to drop the column `userWhoCreatedId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "userWhoCreatedId";

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userWhoUpdatedId_fkey" FOREIGN KEY ("userWhoUpdatedId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
