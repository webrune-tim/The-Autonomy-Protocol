import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';

// Explicitly load the .env file from the current directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!process.env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!,
	},
	verbose: true,
	strict: true
});