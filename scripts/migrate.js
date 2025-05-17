const { exec } = require('child_process');

exec('npx prisma migrate deploy', (error, stdout, stderr) => {
  if (error) {
    console.error(`[❌] Error ejecutando migración: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`[⚠️] stderr: ${stderr}`);
  }
  console.log(`[✅] Migraciones aplicadas:\n${stdout}`);
});
