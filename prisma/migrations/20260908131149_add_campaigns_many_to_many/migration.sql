/*
  Warnings:

  - You are about to drop the column `campaign` on the `Itinerary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "campaign";

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraryCampaign" (
    "itineraryId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,

    CONSTRAINT "ItineraryCampaign_pkey" PRIMARY KEY ("itineraryId","campaignId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_code_key" ON "Campaign"("code");

-- AddForeignKey
ALTER TABLE "ItineraryCampaign" ADD CONSTRAINT "ItineraryCampaign_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryCampaign" ADD CONSTRAINT "ItineraryCampaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
