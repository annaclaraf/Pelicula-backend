-- CreateTable
CREATE TABLE "MoviesToWatch" (
    "userId" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "poster_path" TEXT NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoviesToWatch_pkey" PRIMARY KEY ("userId","id")
);
