-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Domain" ADD VALUE 'BUSINESS_MANAGEMENT';
ALTER TYPE "Domain" ADD VALUE 'FINANCE';
ALTER TYPE "Domain" ADD VALUE 'ACCOUNTING';
ALTER TYPE "Domain" ADD VALUE 'HUMAN_RESOURCES';
ALTER TYPE "Domain" ADD VALUE 'MARKETING';
ALTER TYPE "Domain" ADD VALUE 'SALES';
ALTER TYPE "Domain" ADD VALUE 'OPERATIONS';
ALTER TYPE "Domain" ADD VALUE 'STRATEGY';
ALTER TYPE "Domain" ADD VALUE 'PROJECT_MANAGEMENT';
ALTER TYPE "Domain" ADD VALUE 'SUPPLY_CHAIN_MANAGEMENT';
ALTER TYPE "Domain" ADD VALUE 'CONSULTING';
ALTER TYPE "Domain" ADD VALUE 'ENTREPRENEURSHIP';
ALTER TYPE "Domain" ADD VALUE 'BUSINESS_DEVELOPMENT';
ALTER TYPE "Domain" ADD VALUE 'BUSINESS_ANALYTICS';
ALTER TYPE "Domain" ADD VALUE 'ECONOMICS';
ALTER TYPE "Domain" ADD VALUE 'PUBLIC_RELATIONS';
