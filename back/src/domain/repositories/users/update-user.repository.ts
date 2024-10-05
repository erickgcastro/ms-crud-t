import { User } from "@prisma/client"

export interface IUpdateUserRepository {
  update: (params: IUpdateUserRepository.Params) => IUpdateUserRepository.Result
}

export namespace IUpdateUserRepository {
  export type Params = {
    id: string
    data: {
      email?: string
      name?: string
    }
  }

  export type Result = Promise<User>
}
