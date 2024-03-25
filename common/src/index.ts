
import z from 'zod'

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})


export const createPostSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const updatePostSchema = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})
export type AuthSchema = z.infer<typeof authSchema>

export type createPostSchema = z.infer<typeof createPostSchema>

export type UpdatePostSchema = z.infer<typeof updatePostSchema>