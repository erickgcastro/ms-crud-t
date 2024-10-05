import { User } from "@prisma/client"

export interface IFindUserByEmailService {
  execute: (email: string) => IFindUserByEmailService.Result
}

export namespace IFindUserByEmailService {
  export type Result = Promise<User | null>
}
