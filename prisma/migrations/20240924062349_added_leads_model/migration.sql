-- CreateTable
CREATE TABLE "Leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "checkbox" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Leads_emailAddress_key" ON "Leads"("emailAddress");
