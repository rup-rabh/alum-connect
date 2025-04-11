-- CreateEnum
CREATE TYPE "JobDescriptionType" AS ENUM ('TEXT', 'URL');

-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "jdType" "JobDescriptionType" NOT NULL DEFAULT 'TEXT';
