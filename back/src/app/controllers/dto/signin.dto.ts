import z from "zod"

export const signinDTO = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export type ISigninDTO = z.infer<typeof signinDTO>
