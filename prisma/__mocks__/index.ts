import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { URL } from 'url';
import { afterEach, beforeEach } from 'vitest';



const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provide a database url');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append('schema', schema);
  return url.toString()
};

const schemaId = randomUUID()
const prismaBinary = join(__dirname, '..', '..', 'node_modules', '.bin', 'prisma');
const url = generateDatabaseURL(schemaId);

export const prismaMocked = new PrismaClient({
  datasources: { db: { url } },
});


beforeEach(() => {
  execSync(`${prismaBinary} db push --skip-generate`, {
    env: {
      ...process.env,
      DATABASE_URL: generateDatabaseURL(schemaId),
    },
  });

});

afterEach(async () => {
  await prismaMocked.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
  await prismaMocked.$disconnect();
});

