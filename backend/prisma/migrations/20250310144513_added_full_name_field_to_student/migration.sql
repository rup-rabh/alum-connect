/*
  Warnings:

  - Made the column `presentCompany` on table `Alumni` required. This step will fail if there are existing NULL values in that column.
  - Made the column `domain` on table `Alumni` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fullName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `cgpa` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cv` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rollno` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `domain` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Alumni" ALTER COLUMN "presentCompany" SET NOT NULL,
ALTER COLUMN "domain" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "fullName" TEXT NOT NULL,
ALTER COLUMN "cgpa" SET NOT NULL,
ALTER COLUMN "cv" SET NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "rollno" SET NOT NULL,
ALTER COLUMN "domain" SET NOT NULL;
