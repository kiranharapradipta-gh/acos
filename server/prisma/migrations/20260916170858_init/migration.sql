/*
  Warnings:

  - The values [DECOMMISSIONED] on the enum `ACUnitStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SPLIT_WALL,SPLIT_CASSETTE,SPLIT_DUCT,VRV_VRF] on the enum `ACUnitType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MATERIAL] on the enum `InvoiceItemType` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCELLED] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [BI_MONTHLY,SEMI_ANNUAL] on the enum `MaintenanceFrequency` will be removed. If these variants are still used in the database, this will fail.
  - The values [SUCCESS] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [DIAGNOSIS] on the enum `PhotoType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MOBILE_APP,RECURRING] on the enum `RequestSource` will be removed. If these variants are still used in the database, this will fail.
  - The values [SALE,USAGE,RETURN] on the enum `StockMovementType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `assetCode` on the `ACUnit` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `ACUnit` table. All the data in the column will be lost.
  - You are about to drop the column `locationLabel` on the `ACUnit` table. All the data in the column will be lost.
  - You are about to drop the column `entityType` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `costPrice` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `minimumStock` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `sellingPrice` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryItemId` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `intervalMonths` on the `MaintenanceContract` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `MaintenanceContract` table. All the data in the column will be lost.
  - The primary key for the `MaintenanceContractUnit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `acUnitId` on the `MaintenanceSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `MaintenanceSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `MaintenanceSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `MaintenanceSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `paymentNo` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receivedById` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `propertyCode` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedMinutes` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `preferredDate` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `preferredTime` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `requestNumber` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `StockMovement` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `StockMovement` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `TechnicianProfile` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `TechnicianProfile` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `TechnicianProfile` table. All the data in the column will be lost.
  - You are about to drop the column `arrivedAt` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `cancellationReason` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `cancelledAt` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledEnd` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledStart` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `checked` on the `WorkOrderChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `checkedAt` on the `WorkOrderChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `WorkOrderChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `WorkOrderChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `electricalReading` on the `WorkOrderDiagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedAction` on the `WorkOrderDiagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `refrigerantPressure` on the `WorkOrderDiagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `stockMovementId` on the `WorkOrderPartUsage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyId,unitCode]` on the table `ACUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contractId,acUnitId]` on the table `MaintenanceContractUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessId,requestNo]` on the table `ServiceRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unitCode` to the `ACUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MaintenanceContractUnit` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `scheduledAt` to the `MaintenanceSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestNo` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdById` on table `ServiceRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdById` on table `WorkOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `complaint` on table `WorkOrder` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `item` to the `WorkOrderChecklistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WorkOrderChecklistItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ACUnitStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'REMOVED');
ALTER TABLE "public"."ACUnit" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ACUnit" ALTER COLUMN "status" TYPE "ACUnitStatus_new" USING ("status"::text::"ACUnitStatus_new");
ALTER TYPE "ACUnitStatus" RENAME TO "ACUnitStatus_old";
ALTER TYPE "ACUnitStatus_new" RENAME TO "ACUnitStatus";
DROP TYPE "public"."ACUnitStatus_old";
ALTER TABLE "ACUnit" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ACUnitType_new" AS ENUM ('SPLIT', 'CASSETTE', 'CEILING', 'FLOOR_STANDING', 'VRV', 'VRF', 'WINDOW', 'CENTRAL', 'PORTABLE', 'OTHER');
ALTER TABLE "ACUnit" ALTER COLUMN "type" TYPE "ACUnitType_new" USING ("type"::text::"ACUnitType_new");
ALTER TYPE "ACUnitType" RENAME TO "ACUnitType_old";
ALTER TYPE "ACUnitType_new" RENAME TO "ACUnitType";
DROP TYPE "public"."ACUnitType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AssignmentStatus" ADD VALUE 'IN_PROGRESS';
ALTER TYPE "AssignmentStatus" ADD VALUE 'CANCELLED';

-- AlterEnum
ALTER TYPE "InventoryItemType" ADD VALUE 'TOOL';

-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceItemType_new" AS ENUM ('SERVICE', 'PART', 'LABOR', 'DISCOUNT', 'OTHER');
ALTER TABLE "InvoiceItem" ALTER COLUMN "type" TYPE "InvoiceItemType_new" USING ("type"::text::"InvoiceItemType_new");
ALTER TYPE "InvoiceItemType" RENAME TO "InvoiceItemType_old";
ALTER TYPE "InvoiceItemType_new" RENAME TO "InvoiceItemType";
DROP TYPE "public"."InvoiceItemType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceStatus_new" AS ENUM ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'VOID', 'OVERDUE');
ALTER TABLE "public"."Invoice" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invoice" ALTER COLUMN "status" TYPE "InvoiceStatus_new" USING ("status"::text::"InvoiceStatus_new");
ALTER TYPE "InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "public"."InvoiceStatus_old";
ALTER TABLE "Invoice" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterEnum
ALTER TYPE "MaintenanceContractStatus" ADD VALUE 'PAUSED';

-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceFrequency_new" AS ENUM ('MONTHLY', 'BIMONTHLY', 'QUARTERLY', 'SEMIANNUAL', 'ANNUAL', 'CUSTOM');
ALTER TABLE "MaintenanceContract" ALTER COLUMN "frequency" TYPE "MaintenanceFrequency_new" USING ("frequency"::text::"MaintenanceFrequency_new");
ALTER TYPE "MaintenanceFrequency" RENAME TO "MaintenanceFrequency_old";
ALTER TYPE "MaintenanceFrequency_new" RENAME TO "MaintenanceFrequency";
DROP TYPE "public"."MaintenanceFrequency_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
ALTER TABLE "public"."Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PhotoType_new" AS ENUM ('BEFORE', 'DURING', 'AFTER', 'DAMAGE', 'METER', 'SERIAL_NUMBER', 'OTHER');
ALTER TABLE "WorkOrderPhoto" ALTER COLUMN "type" TYPE "PhotoType_new" USING ("type"::text::"PhotoType_new");
ALTER TYPE "PhotoType" RENAME TO "PhotoType_old";
ALTER TYPE "PhotoType_new" RENAME TO "PhotoType";
DROP TYPE "public"."PhotoType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RequestSource_new" AS ENUM ('PHONE', 'WHATSAPP', 'WEBSITE', 'WALK_IN', 'REFERRAL', 'INTERNAL', 'OTHER');
ALTER TABLE "public"."ServiceRequest" ALTER COLUMN "source" DROP DEFAULT;
ALTER TABLE "ServiceRequest" ALTER COLUMN "source" TYPE "RequestSource_new" USING ("source"::text::"RequestSource_new");
ALTER TYPE "RequestSource" RENAME TO "RequestSource_old";
ALTER TYPE "RequestSource_new" RENAME TO "RequestSource";
DROP TYPE "public"."RequestSource_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StockMovementType_new" AS ENUM ('PURCHASE', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT', 'USED', 'RETURNED', 'TRANSFER_IN', 'TRANSFER_OUT');
ALTER TABLE "StockMovement" ALTER COLUMN "type" TYPE "StockMovementType_new" USING ("type"::text::"StockMovementType_new");
ALTER TYPE "StockMovementType" RENAME TO "StockMovementType_old";
ALTER TYPE "StockMovementType_new" RENAME TO "StockMovementType";
DROP TYPE "public"."StockMovementType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ACUnit" DROP CONSTRAINT "ACUnit_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_branchId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceItem" DROP CONSTRAINT "InvoiceItem_inventoryItemId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceContract" DROP CONSTRAINT "MaintenanceContract_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceSchedule" DROP CONSTRAINT "MaintenanceSchedule_acUnitId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceSchedule" DROP CONSTRAINT "MaintenanceSchedule_businessId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceSchedule" DROP CONSTRAINT "MaintenanceSchedule_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceSchedule" DROP CONSTRAINT "MaintenanceSchedule_workOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_receivedById_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_businessId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_businessId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_createdById_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_inventoryItemId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicianProfile" DROP CONSTRAINT "TechnicianProfile_businessId_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_createdById_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrderPartUsage" DROP CONSTRAINT "WorkOrderPartUsage_stockMovementId_fkey";

-- DropIndex
DROP INDEX "ACUnit_brand_idx";

-- DropIndex
DROP INDEX "ACUnit_businessId_assetCode_key";

-- DropIndex
DROP INDEX "ACUnit_businessId_idx";

-- DropIndex
DROP INDEX "ACUnit_businessId_serialNumber_key";

-- DropIndex
DROP INDEX "AuditLog_entityType_entityId_idx";

-- DropIndex
DROP INDEX "Customer_branchId_idx";

-- DropIndex
DROP INDEX "InventoryItem_isActive_idx";

-- DropIndex
DROP INDEX "Invoice_issueDate_idx";

-- DropIndex
DROP INDEX "InvoiceItem_inventoryItemId_idx";

-- DropIndex
DROP INDEX "MaintenanceContract_propertyId_idx";

-- DropIndex
DROP INDEX "MaintenanceContract_startDate_endDate_idx";

-- DropIndex
DROP INDEX "MaintenanceSchedule_businessId_idx";

-- DropIndex
DROP INDEX "MaintenanceSchedule_scheduledDate_idx";

-- DropIndex
DROP INDEX "MaintenanceSchedule_workOrderId_key";

-- DropIndex
DROP INDEX "Payment_businessId_paymentNo_key";

-- DropIndex
DROP INDEX "Payment_paidAt_idx";

-- DropIndex
DROP INDEX "Property_businessId_idx";

-- DropIndex
DROP INDEX "Property_businessId_propertyCode_key";

-- DropIndex
DROP INDEX "ServiceRequest_businessId_requestNumber_key";

-- DropIndex
DROP INDEX "ServiceRequest_preferredDate_idx";

-- DropIndex
DROP INDEX "StockMovement_businessId_idx";

-- DropIndex
DROP INDEX "StockMovement_referenceType_referenceId_idx";

-- DropIndex
DROP INDEX "TechnicianProfile_businessId_employeeCode_key";

-- DropIndex
DROP INDEX "TechnicianProfile_businessId_idx";

-- DropIndex
DROP INDEX "TechnicianProfile_isAvailable_idx";

-- DropIndex
DROP INDEX "User_businessId_email_key";

-- DropIndex
DROP INDEX "WorkOrder_branchId_idx";

-- DropIndex
DROP INDEX "WorkOrder_propertyId_idx";

-- DropIndex
DROP INDEX "WorkOrder_scheduledStart_idx";

-- DropIndex
DROP INDEX "WorkOrderPartUsage_stockMovementId_key";

-- AlterTable
ALTER TABLE "ACUnit" DROP COLUMN "assetCode",
DROP COLUMN "businessId",
DROP COLUMN "locationLabel",
ADD COLUMN     "capacityBtu" INTEGER,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "unitCode" TEXT NOT NULL,
ADD COLUMN     "warrantyUntil" TIMESTAMP(3),
ALTER COLUMN "brand" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "entityType",
DROP COLUMN "metadata",
ADD COLUMN     "entity" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "newData" JSONB,
ADD COLUMN     "oldData" JSONB,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "city" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "province" TEXT;

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "city" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "province" TEXT;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "branchId",
ADD COLUMN     "averageOrderValue" DECIMAL(15,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "costPrice",
DROP COLUMN "minimumStock",
DROP COLUMN "sellingPrice",
DROP COLUMN "stock",
ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "minimumQty" DECIMAL(12,3) NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" DECIMAL(12,3) NOT NULL DEFAULT 0,
ADD COLUMN     "unitCost" DECIMAL(15,2) NOT NULL DEFAULT 0,
ALTER COLUMN "type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "dueDate",
DROP COLUMN "issueDate",
ADD COLUMN     "dueAt" TIMESTAMP(3),
ADD COLUMN     "issuedAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "createdAt",
DROP COLUMN "inventoryItemId",
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(12,3),
ALTER COLUMN "unitPrice" DROP DEFAULT,
ALTER COLUMN "total" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MaintenanceContract" DROP COLUMN "intervalMonths",
DROP COLUMN "propertyId",
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "price" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MaintenanceContractUnit" DROP CONSTRAINT "MaintenanceContractUnit_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "MaintenanceContractUnit_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MaintenanceSchedule" DROP COLUMN "acUnitId",
DROP COLUMN "businessId",
DROP COLUMN "propertyId",
DROP COLUMN "scheduledDate",
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentNo",
DROP COLUMN "receivedById",
DROP COLUMN "reference",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "referenceNo" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "invoiceId" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "paidAt" DROP NOT NULL,
ALTER COLUMN "paidAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "businessId",
DROP COLUMN "propertyCode";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "estimatedMinutes",
ADD COLUMN     "durationMin" INTEGER,
ALTER COLUMN "basePrice" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "preferredDate",
DROP COLUMN "preferredTime",
DROP COLUMN "requestNumber",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "requestNo" TEXT NOT NULL,
ADD COLUMN     "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "requestedDate" TIMESTAMP(3),
ALTER COLUMN "propertyId" DROP NOT NULL,
ALTER COLUMN "createdById" SET NOT NULL,
ALTER COLUMN "source" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "businessId",
DROP COLUMN "createdById",
ALTER COLUMN "unitCost" DROP NOT NULL,
ALTER COLUMN "unitCost" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TechnicianProfile" DROP COLUMN "businessId",
DROP COLUMN "notes",
DROP COLUMN "skills",
ADD COLUMN     "hourlyRate" DECIMAL(15,2),
ADD COLUMN     "skillLevel" TEXT,
ADD COLUMN     "specialization" TEXT;

-- AlterTable
ALTER TABLE "WorkOrder" DROP COLUMN "arrivedAt",
DROP COLUMN "cancellationReason",
DROP COLUMN "cancelledAt",
DROP COLUMN "scheduledEnd",
DROP COLUMN "scheduledStart",
DROP COLUMN "serviceId",
ADD COLUMN     "customerNotes" TEXT,
ADD COLUMN     "scheduledAt" TIMESTAMP(3),
ALTER COLUMN "propertyId" DROP NOT NULL,
ALTER COLUMN "createdById" SET NOT NULL,
ALTER COLUMN "complaint" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkOrderChecklistItem" DROP COLUMN "checked",
DROP COLUMN "checkedAt",
DROP COLUMN "label",
DROP COLUMN "sortOrder",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "item" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkOrderDiagnosis" DROP COLUMN "electricalReading",
DROP COLUMN "recommendedAction",
DROP COLUMN "refrigerantPressure",
ADD COLUMN     "actionTaken" TEXT,
ADD COLUMN     "recommendation" TEXT;

-- AlterTable
ALTER TABLE "WorkOrderLabor" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(12,3),
ALTER COLUMN "unitPrice" DROP DEFAULT,
ALTER COLUMN "total" DROP DEFAULT;

-- AlterTable
ALTER TABLE "WorkOrderPartUsage" DROP COLUMN "stockMovementId",
ALTER COLUMN "unitPrice" DROP DEFAULT,
ALTER COLUMN "total" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "ACUnit_serialNumber_idx" ON "ACUnit"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ACUnit_propertyId_unitCode_key" ON "ACUnit"("propertyId", "unitCode");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "InventoryItem_branchId_idx" ON "InventoryItem"("branchId");

-- CreateIndex
CREATE INDEX "Invoice_dueAt_idx" ON "Invoice"("dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "MaintenanceContractUnit_contractId_acUnitId_key" ON "MaintenanceContractUnit"("contractId", "acUnitId");

-- CreateIndex
CREATE INDEX "MaintenanceSchedule_scheduledAt_idx" ON "MaintenanceSchedule"("scheduledAt");

-- CreateIndex
CREATE INDEX "Payment_customerId_idx" ON "Payment"("customerId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "ServiceRequest_requestedDate_idx" ON "ServiceRequest"("requestedDate");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequest_businessId_requestNo_key" ON "ServiceRequest"("businessId", "requestNo");

-- CreateIndex
CREATE INDEX "StockMovement_type_idx" ON "StockMovement"("type");

-- CreateIndex
CREATE INDEX "TechnicianProfile_employeeCode_idx" ON "TechnicianProfile"("employeeCode");

-- CreateIndex
CREATE INDEX "WorkOrder_scheduledAt_idx" ON "WorkOrder"("scheduledAt");

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
