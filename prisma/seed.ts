import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const employeeData = [
    { name: "Jamie", id: "150", manager_id: null },
    { name: "Allan", id: "100", manager_id: "150" },
    { name: "Martin", id: "220", manager_id: "100" },
    { name: "Alex", id: "275", manager_id: "100" },
    { name: "Steve", id: "400", manager_id: "150" },
    { name: "David", id: "190", manager_id: "400" },
  ];
  for (const employee of employeeData) {
    await prisma.employee.upsert({
      where: { id: employee.id },
      update: {},
      create: {
        id: employee.id,
        name: employee.name,
        managerId: employee.manager_id,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
