import { Document } from "@prisma/client"

export interface ICreateDocumentRepository {
  create: (params: ICreateDocumentRepository.Params) => ICreateDocumentRepository.Result
}

export namespace ICreateDocumentRepository {
  export type Params = {
    name: string
    status?: boolean
    userId: string
  }

  export type Result = Promise<Document>
}
