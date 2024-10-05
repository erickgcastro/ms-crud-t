import { User } from "@prisma/client"

export interface IFindUserByEmailRepository {
  findByEmail: (email: string) => IFindUserByEmailRepository.Result
}

export namespace IFindUserByEmailRepository {
  export type Result = Promise<User | null>
}
