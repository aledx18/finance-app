import { Hono } from 'hono'
import authors from './authors'
import books from './books'
import { handle } from 'hono/netlify'
// import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app.route('/authors', authors).route('/books', books)

export const GET = handle(routes)

export type AppType = typeof routes
