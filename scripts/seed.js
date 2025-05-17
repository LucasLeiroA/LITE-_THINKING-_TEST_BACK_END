const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seed() {
  const users = [
    {
      email: 'admin@lite.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
    {
      email: 'externo@lite.com',
      password: await bcrypt.hash('externo123', 10),
      role: 'externo',
    },
  ];

  for (const user of users) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } });
    if (!exists) {
      await prisma.user.create({ data: user });
      console.log(`Usuario creado: ${user.email}`);
    }
  }

  await prisma.$disconnect();
}

seed();
