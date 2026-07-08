const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const blogs = await prisma.blog.findMany({ select: { title: true, slug: true } });
  console.log(JSON.stringify(blogs, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
