-- CreateTable
CREATE TABLE "Company" (
    "nit" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("nit")
);

-- CreateTable
CREATE TABLE "Product" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "prices" JSONB NOT NULL,
    "companyNIT" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyNIT_fkey" FOREIGN KEY ("companyNIT") REFERENCES "Company"("nit") ON DELETE CASCADE ON UPDATE CASCADE;
