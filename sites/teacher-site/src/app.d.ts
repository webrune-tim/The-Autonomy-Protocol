import type { Session, User } from 'better-auth'

declare global {
	namespace App {
		interface Locals {
			session: Session | null
			user:
				| (User & {
						role?: 'user' | 'student' | 'teacher' | 'admin' | 'superadmin' | string
						theme?: string | null
						[key: string]: any
				  })
				| null
		}
		interface PageData {
			session: Session | null
			user:
				| (User & {
						role?: 'user' | 'student' | 'teacher' | 'admin' | 'superadmin' | string
						theme?: string | null
						[key: string]: any
				  })
				| null
		}
	}
}

export {}
