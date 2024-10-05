import { Document } from "@prisma/client"

export interface IUpdateDocumentRepository {
  update: (params: IUpdateDocumentRepository.Params) => IUpdateDocumentRepository.Result
}

export namespace IUpdateDocumentRepository {
  export type Params = {
    id: string
    data: {
      name?: string
      status?: boolean
    }
  }

  export type Result = Promise<Document>
}
