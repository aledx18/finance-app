import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env.local' })

import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN
  }
} satisfies Config
