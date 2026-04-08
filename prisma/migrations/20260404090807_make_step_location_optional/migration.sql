-- DropForeignKey
ALTER TABLE "ItineraryStep" DROP CONSTRAINT "ItineraryStep_locationId_fkey";

-- AlterTable
ALTER TABLE "ItineraryStep" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ItineraryStep" ADD CONSTRAINT "ItineraryStep_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
