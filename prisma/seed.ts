import { PrismaClient } from "@/src/generated/client/dev";

const prisma = new PrismaClient();

async function main() {
  // Seed data can be added here
  const existing = await prisma.profile.findFirst();

  if (!existing) {
    await prisma.profile.create({
      data: {
        telephone: "",
        email: "",
        cv: "",
        portfolio: "",

      },
    });
  }
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
