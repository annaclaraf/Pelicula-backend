-- CreateTable
CREATE TABLE "MoviesWatched" (
    "userId" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "poster_path" TEXT NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoviesWatched_pkey" PRIMARY KEY ("userId","id")
);
