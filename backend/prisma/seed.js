const { PrismaClient, Role } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Branch verileri
  await prisma.branch.createMany({
    data: [
      {
        name: 'Branch 1',
        full_address: '123 Main St, City, Country',
        latitude: 40.712776,
        longitude: -74.005974,
        phone: '123-456-7890',
      },
      {
        name: 'Branch 2',
        full_address: '456 Elm St, City, Country',
        latitude: 34.052235,
        longitude: -118.243683,
        phone: '234-567-8901',
      },
      {
        name: 'Branch 3',
        full_address: '789 Oak St, City, Country',
        latitude: 37.774929,
        longitude: -122.419418,
        phone: '345-678-9012',
      },
      {
        name: 'Branch 4',
        full_address: '101 Pine St, City, Country',
        latitude: 41.878113,
        longitude: -87.629799,
        phone: '456-789-0123',
      },
      {
        name: 'Branch 5',
        full_address: '202 Birch St, City, Country',
        latitude: 29.760427,
        longitude: -95.369804,
        phone: '567-890-1234',
      },
    ],
  });

  const allBranches = await prisma.branch.findMany();

    // User verileri
await prisma.user.createMany({
  data: [
    {
      id: '400c593c-6041-7077-f90b-76dd27ff1e25',
      name: 'Osman',
      role: Role.USER,
      branchId: allBranches[0].id,
    },
    {
      id: 'c04c998c-d0c1-70a9-4113-b2e1ca710a0b',
      name: 'Eren',
      role: Role.OWNER,
      branchId: allBranches[1].id,
    },
    {
      id: 'f0fcf9bc-2081-70ee-73ef-99b6e734f136',
      name: 'Bob',
      role: Role.OWNER,
      branchId: allBranches[2].id,
    }
  ],
});


}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });