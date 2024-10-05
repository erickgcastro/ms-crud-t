import { User } from "@prisma/client"

export interface IDeleteUserService {
  execute: (id: string) => IDeleteUserService.Result
}

export namespace IDeleteUserService {
  export type Result = Promise<User>
}
