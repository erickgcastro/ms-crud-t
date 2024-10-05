import { Document } from "@prisma/client"

export interface IListDocumentsByUserService {
  execute: (userId: string) => IListDocumentsByUserService.Result
}

export namespace IListDocumentsByUserService {
  export type Result = Promise<Document[]>
}
