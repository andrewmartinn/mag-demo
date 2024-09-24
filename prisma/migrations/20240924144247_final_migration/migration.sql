-- CreateTable
CREATE TABLE "Leads" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "checkbox" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "callNotes" TEXT,
    "checkbox" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Leads_emailAddress_key" ON "Leads"("emailAddress");
