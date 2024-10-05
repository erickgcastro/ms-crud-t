import { User } from "@prisma/client"

export interface IFindUserByIdRepository {
  findById: (id: string) => IFindUserByIdRepository.Result
}

export namespace IFindUserByIdRepository {
  export type Result = Promise<User | null>
}
