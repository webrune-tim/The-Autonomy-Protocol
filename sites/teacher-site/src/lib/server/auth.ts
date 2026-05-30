import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { admin, createAccessControl } from 'better-auth/plugins'
import { env } from '$env/dynamic/private'
import { getRequestEvent } from '$app/server'
import { dev } from '$app/environment'
import { db } from '$lib/server/db'
import * as schema from '$lib/server/db/schema'

const adminStatements = {
	user: [
		'create',
		'list',
		'set-role',
		'ban',
		'impersonate',
		'delete',
		'set-password',
		'get',
		'update'
	],
	session: ['list', 'revoke', 'delete']
} as const

const ac = createAccessControl(adminStatements)
const adminRole = ac.newRole(adminStatements)
const userRole = ac.newRole({
	user: [],
	session: []
})
const studentRole = ac.newRole({
	user: [],
	session: []
})

const baseURL =
	env.ORIGIN ||
	(dev ? 'http://localhost:8080' : 'https://the-autonomy-protocol.vercel.app')

const cleanBaseURL = baseURL.replace(/\/$/, '')

export const auth = betterAuth({
	baseURL: cleanBaseURL,
	secret: env.BETTER_AUTH_SECRET,
	trustedOrigins: [
		cleanBaseURL,
		'https://the-autonomy-protocol.vercel.app',
		'http://localhost:5173',
		'http://127.0.0.1:5173',
		'http://localhost:8080',
		'http://127.0.0.1:8080'
	].filter(Boolean) as string[],
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema
	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			redirectURI: `${cleanBaseURL}/api/auth/callback/google`
		}
	},
	user: {
		additionalFields: {
			theme: {
				type: 'string',
				required: false
			}
		}
	},
	plugins: [
		admin({
			adminRoles: ['admin', 'superadmin'],
			roles: {
				admin: adminRole,
				superadmin: adminRole,
				user: userRole,
				student: studentRole
			}
		}),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
})
