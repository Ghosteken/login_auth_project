const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Could not connect to database!");
    console.error(error);
  }
};

module.exports = { prisma, connectDatabase };
