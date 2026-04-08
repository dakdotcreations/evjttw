/*
  Warnings:

  - You are about to drop the column `mediaType` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "mediaType",
DROP COLUMN "mediaUrl",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "mediaType",
DROP COLUMN "mediaUrl",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- DropEnum
DROP TYPE "MediaType";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraryTag" (
    "itineraryId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ItineraryTag_pkey" PRIMARY KEY ("itineraryId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- AddForeignKey
ALTER TABLE "ItineraryTag" ADD CONSTRAINT "ItineraryTag_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryTag" ADD CONSTRAINT "ItineraryTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
