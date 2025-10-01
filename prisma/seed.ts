import { PrismaClient } from "@prisma/client";
// import { usersSeed } from "./seeds/users";
import { configSystemSeed } from "./seeds/configSystemSeed";
const prisma = new PrismaClient();

async function main() {
  // Executa as seeds de forma sequencial. Se a ordem não for importante, pode usar Promise.all
  // await usersSeed();
  
  await configSystemSeed();
  
  console.log("Todas as seeds foram executadas com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro ao executar as seeds:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });