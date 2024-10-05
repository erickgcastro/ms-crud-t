import z from "zod"

export const updateDocumentDTO = z.object({
  name: z.string().min(3).optional(),
  status: z.boolean().optional(),
})

export type IUpdateDocumentDTO = z.infer<typeof updateDocumentDTO>
