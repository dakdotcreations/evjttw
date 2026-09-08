/*
  Warnings:

  - You are about to drop the column `durationMinutes` on the `ItineraryStep` table. All the data in the column will be lost.
  - You are about to drop the column `durationText` on the `ItineraryStep` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "campaign" TEXT,
ADD COLUMN     "complementaries" TEXT[],
ADD COLUMN     "excludes" TEXT[],
ADD COLUMN     "faqs" JSONB,
ADD COLUMN     "includes" TEXT[],
ADD COLUMN     "meetingPoint" TEXT,
ADD COLUMN     "pickup" TEXT,
ADD COLUMN     "pricingDisabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ItineraryStep" DROP COLUMN "durationMinutes",
DROP COLUMN "durationText",
ADD COLUMN     "durationDays" INTEGER,
ADD COLUMN     "durationHours" INTEGER;
