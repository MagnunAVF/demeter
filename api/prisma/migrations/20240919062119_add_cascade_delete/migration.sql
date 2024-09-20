-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_farmerId_fkey";

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
