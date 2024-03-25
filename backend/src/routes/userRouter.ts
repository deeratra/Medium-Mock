import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { authSchema } from '@deer21/medium-z-common'


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    try {
        const body = await c.req.json()
        const { success } = authSchema.safeParse(body)
        if (!success) {
            c.status(411)
            return c.json({ "message": "Invalid Inputs" })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })

        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET)

        return c.text(token)
    } catch (e) {
        console.error('Error during signup:', e)
        c.status(500)
        return c.json({ "message": "Internal server error" })
    }
})


userRouter.post("/signin", async (c) => {
    try {
        const body = await c.req.json()
        console.log(body)
        const { success } = authSchema.safeParse(body)
        if (!success) {
            c.status(411)
            console.log(body)
            return c.json({ "message": "Invalid Inputs" })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
            }
        })

        if (user) {
            const token = await sign({
                id: user.id
            }, c.env.JWT_SECRET)
            return c.text(token)
        } else {
            c.status(404)
            return c.json({ "message": "User not found" })
        }
    } catch (e) {
        console.error('Error during signin:', e)
        c.status(500)
        return c.json({ "message": "Internal server error" })
    }
})
