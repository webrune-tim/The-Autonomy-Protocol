import { createAuthClient } from 'better-auth/svelte'
import { env } from '$env/dynamic/public'

export const authClient = createAuthClient({
	baseURL:
		typeof window !== 'undefined'
			? window.location.origin
			: env.PUBLIC_ORIGIN || 'http://localhost:8080'
})
