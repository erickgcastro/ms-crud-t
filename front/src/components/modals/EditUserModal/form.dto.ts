import { z } from "zod"

export const formDTO = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
})

export type IFormDTO = z.infer<typeof formDTO>
