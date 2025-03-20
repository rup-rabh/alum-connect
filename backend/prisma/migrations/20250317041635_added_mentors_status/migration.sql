-- CreateEnum
CREATE TYPE "mentorAvailability" AS ENUM ('AVAILABLE', 'BUSY', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "availabilityStatus" "mentorAvailability" NOT NULL DEFAULT 'AVAILABLE';
