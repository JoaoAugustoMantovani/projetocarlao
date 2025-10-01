// import path from "node:path";
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  
  migrations: {
    path: "./prisma/migrations",
    seed: "ts-node prisma/seed.ts"
  },
  views: {
    path: "./prisma/views",
  },
  typedSql: {
    path: "./prisma/queries",
  }
});