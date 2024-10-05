import { User } from "@prisma/client"

export interface IGetUserByIdService {
  execute: (id: string) => IGetUserByIdService.Result
}

export namespace IGetUserByIdService {
  export type Result = Promise<User | null>
}
