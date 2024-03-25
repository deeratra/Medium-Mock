import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify } from "hono/jwt"
import { createPostSchema, updatePostSchema } from "@deer21/medium-z-common"

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

postRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || ""
    try {
        const user = await verify(authHeader.split(" ")[1], c.env.JWT_SECRET)
        if (user) {
            c.set("userId", user.id)
            await next()
        }
        else {
            c.status(403);
            return c.json({ message: "You are not logged in" })
        }
    }
    catch (e) {
        console.error('Error during authorization:', e)
        c.status(403)
        return c.json({ message: "Failed to verify token" })
    }
})

postRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    try {
        const body = await c.req.json()
        const { success } = createPostSchema.safeParse(body)
        console.log('Error while creating blog post:')
        if (!success) {
            c.status(411)
            return c.json({ "message": "Invalid Inputs" })
        }
        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userId")
            }
        })
        return c.json({
            id: newPost.id
        })
    }
    catch (e) {
        console.error('Error while creating blog post:', e)
        c.status(500)
        return c.json({
            message: "Error while creating blog post"
        })
    }
})

postRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    try {
        const body = await c.req.json()
        const { success } = updatePostSchema.safeParse(body)
        if (!success) {
            c.status(411)
            return c.json({ "message": "Invalid Inputs" })
        }
        const updatedPost = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({
            id: updatedPost.id
        })
    }
    catch (e) {
        console.error('Error while updating blog post:', e)
        c.status(500)
        return c.json({
            message: "Error while updating blog post"
        })
    }
})

postRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const posts = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(posts)
    }
    catch (e) {
        console.error('Error while fetching blogs:', e)
        c.status(500)
        return c.json({
            message: "Error while fetching blogs"
        })
    }
})

postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: c.req.param("id")
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (post != null)
            return c.json({
                post
            })
        else {
            c.status(404)
            return c.json({
                message: "Post not found"
            })
        }
    }
    catch (e) {
        console.error('Error while fetching blog post:', e)
        c.status(500)
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})
