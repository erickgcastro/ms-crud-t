import { z } from "zod"

export const formDTO = z.object({
  name: z.string().min(3),
  status: z.boolean(),
})

export type IFormDTO = z.infer<typeof formDTO>
