import { Document } from "@prisma/client"

export interface IFindDocumentByIdRepository {
  findById: (id: string) => IFindDocumentByIdRepository.Result
}

export namespace IFindDocumentByIdRepository {
  export type Result = Promise<Document | null>
}
