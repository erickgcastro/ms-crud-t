import { Document } from "@prisma/client"

export interface IDeleteDocumentRepository {
  delete: (params: IDeleteDocumentRepository.Params) => IDeleteDocumentRepository.Result
}

export namespace IDeleteDocumentRepository {
  export type Params = {
    id: string
    userId: string
  }

  export type Result = Promise<Document>
}
