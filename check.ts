import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const works = await prisma.work.findMany({
    select: { title: true, service: true, published: true }
  });
  console.log(works);
}
main();
