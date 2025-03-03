-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('DATASCIENCE', 'SOFTWARE', 'FRONTEND', 'BACKEND', 'PRODUCT_MANAGEMENT');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "jd" TEXT NOT NULL,
    "domain" "Domain" NOT NULL,
    "location" TEXT NOT NULL,
    "compensation" INTEGER NOT NULL,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);
