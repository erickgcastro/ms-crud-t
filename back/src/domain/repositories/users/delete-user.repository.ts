import { User } from "@prisma/client"

export interface IDeleteUserRepository {
  delete: (id: string) => IDeleteUserRepository.Result
}

export namespace IDeleteUserRepository {
  export type Result = Promise<User>
}
