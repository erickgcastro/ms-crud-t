import z from "zod"

export const updateUserDTO = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
})

export type IUpdateUserDTO = z.infer<typeof updateUserDTO>
