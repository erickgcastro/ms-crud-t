import { Document } from "@prisma/client"

export interface IListDocumentsByUserRepository {
  list: (userId: string) => IListDocumentsByUserRepository.Result
}

export namespace IListDocumentsByUserRepository {
  export type Result = Promise<Document[]>
}
