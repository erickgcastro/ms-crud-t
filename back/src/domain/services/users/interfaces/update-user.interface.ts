import { User } from "@prisma/client"

export interface IUpdateUserService {
  execute: (params: IUpdateUserService.Params) => IUpdateUserService.Result
}

export namespace IUpdateUserService {
  export type Params = {
    id: string
    data: {
      name?: string
      email?: string
    }
  }

  export type Result = Promise<User>
}
