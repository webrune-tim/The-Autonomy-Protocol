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

const isLocalOrigin =
	env.STUDENT_ORIGIN?.includes('localhost') ||
	env.STUDENT_ORIGIN?.includes('127.0.0.1')
const baseURL =
	env.STUDENT_ORIGIN && (dev || !isLocalOrigin)
		? env.STUDENT_ORIGIN
		: 'https://the-autonomy-protocol.vercel.app'

export const auth = betterAuth({
	baseURL: baseURL.replace(/\/$/, ''),
	secret: env.BETTER_AUTH_SECRET,
	trustedOrigins: [
		env.STUDENT_ORIGIN,
		'https://the-autonomy-protocol.vercel.app',
		'http://localhost:5173',
		'http://127.0.0.1:5173'
	].filter(Boolean) as string[],
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema
	}),
	socialProviders: {
		google: {
			clientId: env.STUDENT_GOOGLE_CLIENT_ID,
			clientSecret: env.STUDENT_GOOGLE_CLIENT_SECRET
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
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					// Users registering through the student-site default to the `student` role.
					return {
						data: {
							...user,
							role: (user as { role?: string }).role || 'student'
						}
					}
				}
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
