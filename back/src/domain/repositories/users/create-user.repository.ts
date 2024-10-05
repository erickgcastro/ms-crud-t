import { User } from "@prisma/client"

export interface ICreateUserRepository {
  create: (params: ICreateUserRepository.Params) => ICreateUserRepository.Result
}

export namespace ICreateUserRepository {
  export type Params = {
    email: string
    name: string
    password: string
  }

  export type Result = Promise<User>
}
