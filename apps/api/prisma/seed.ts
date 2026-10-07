import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const primaire = await prisma.educationCycle.create({
    data: {
      name: "Primaire",
      order: 1,
      levels: {
        create: ["CP1", "CP2", "CE1", "CE2", "CM1", "CM2"].map((name, i) => ({
          name,
          order: i + 1,
        })),
      },
    },
  });

  const college = await prisma.educationCycle.create({
    data: {
      name: "Collège",
      order: 2,
      levels: {
        create: ["6ème", "5ème", "4ème", "3ème"].map((name, i) => ({
          name,
          order: i + 1,
        })),
      },
    },
  });

  const lycee = await prisma.educationCycle.create({
    data: {
      name: "Lycée",
      order: 3,
      levels: {
        create: ["2nde", "1ère", "Terminale"].map((name, i) => ({
          name,
          order: i + 1,
        })),
      },
    },
  });

  const universite = await prisma.educationCycle.create({
    data: {
      name: "Université",
      order: 4,
      levels: {
        create: ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"].map(
          (name, i) => ({ name, order: i + 1 })
        ),
      },
    },
  });

  await prisma.plan.createMany({
    data: [
      { name: "Gratuit", priceXof: 0, durationDays: 36500, featuresJson: { lessons: "free_only" } },
      { name: "Premium Mensuel", priceXof: 2000, durationDays: 30, featuresJson: { lessons: "all", exercises: "all", corrections: "all" } },
      { name: "Premium Annuel", priceXof: 18000, durationDays: 365, featuresJson: { lessons: "all", exercises: "all", corrections: "all" } },
    ],
  });

  console.log({ primaire: primaire.id, college: college.id, lycee: lycee.id, universite: universite.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
