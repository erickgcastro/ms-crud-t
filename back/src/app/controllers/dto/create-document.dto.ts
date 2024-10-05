import z from "zod"

export const createDocumentDTO = z.object({
  name: z.string().min(3),
  status: z.boolean(),
})

export type ICreateDocumentDTO = z.infer<typeof createDocumentDTO>
