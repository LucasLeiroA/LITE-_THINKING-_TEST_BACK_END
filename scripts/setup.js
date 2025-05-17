// scripts/setup.js
const { exec } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function runMigrations() {
  return new Promise((resolve, reject) => {
    exec('npx prisma migrate deploy', (error, stdout, stderr) => {
      if (error) {
        console.error('[❌ Migraciones] Error:', error.message);
        return reject(error);
      }
      if (stderr) console.warn('[⚠️ Migraciones]', stderr);
      console.log('[✅ Migraciones]', stdout);
      resolve();
    });
  });
}

async function seedUsers() {
  const defaultUsers = [
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

  for (const user of defaultUsers) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } });
    if (!exists) {
      await prisma.user.create({ data: user });
      console.log(`[Seed] Usuario creado: ${user.email}`);
    }
  }
}

async function start() {
  try {
    await runMigrations();
    await seedUsers();
    await prisma.$disconnect();

    // Inicia el servidor Express
    require('../index.js');
  } catch (err) {
    console.error('❌ Error en setup total:', err.message);
    process.exit(1);
  }
}

start();
