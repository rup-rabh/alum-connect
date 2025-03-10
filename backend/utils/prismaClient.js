const { PrismaClient } = require("@prisma/client");

/** @type {PrismaClient} */
let prisma;

if (!global.__prisma) {
  global.__prisma = new PrismaClient();
  console.log("🔗 Connecting to the database...");

  global.__prisma
    .$connect()
    .then(() => {
      console.log("Connected to the Postgres database.");
    })
    .catch((error) => {
      console.error("❌ Failed to connect to the database:", error);
    });
}

prisma = global.__prisma;

module.exports = prisma;
