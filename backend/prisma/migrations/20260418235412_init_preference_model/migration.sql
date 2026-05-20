-- CreateTable
CREATE TABLE "Preference" (
    "userId" TEXT NOT NULL,
    "unitMeasure" TEXT NOT NULL,
    "thresholds" JSONB NOT NULL,
    "insulinRatios" JSONB NOT NULL,
    "sensitivity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
