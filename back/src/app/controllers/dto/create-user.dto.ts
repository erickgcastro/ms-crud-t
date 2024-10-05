import z from "zod"

export const createUserDTO = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
})

export type ICreateUserDTO = z.infer<typeof createUserDTO>
