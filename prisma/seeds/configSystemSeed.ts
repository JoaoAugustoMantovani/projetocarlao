import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function configSystemSeed() {
  // Array com os dados convertidos do SQL
  const listData = [
    {
      id: 1,
      email_host: "stmp.google.com",
      email_port: "587",
      email_user: "teste@gmail.com",
      email_pass: "123456",
      email_secure: true,
      email_tls: true,
      keyapibackend: "chave api para back-end",
      noticias_ultimasquantidade: 8,
      padraolinhaspaginas: 10,
      forcartrocasenhaemDias: 28,
      linkncmantesreforma: "https://fatectq.cps.sp.gov.br",
      ativo: true
    },

  ];

  // Realiza a inserção dos dados com upsert
  for (const item of listData) {
    await prisma.system_Config.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }

  console.log("Seed dos configuração padrão do sistema realizado com sucesso!");
}