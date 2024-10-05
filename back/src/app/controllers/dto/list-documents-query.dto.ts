import z from "zod"

export const listDocumentsQueryDTO = z.object({
  page: z
    .string()
    .optional()
    .refine((v) => (v === undefined ? true : !Number.isNaN(+v)))
    .transform((v) => (v === undefined ? 1 : +v)),
  limit: z
    .string()
    .optional()
    .refine((v) => (v === undefined ? true : !Number.isNaN(+v)))
    .transform((v) => (v === undefined ? 1 : +v)),
})

export type IListDocumentsQueryDTO = z.infer<typeof listDocumentsQueryDTO>
