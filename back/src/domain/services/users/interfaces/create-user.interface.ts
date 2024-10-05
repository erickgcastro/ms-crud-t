import { User } from "@prisma/client"

export interface ICreateUserService {
  execute: (params: ICreateUserService.Params) => ICreateUserService.Result
}

export namespace ICreateUserService {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = Promise<User>
}
