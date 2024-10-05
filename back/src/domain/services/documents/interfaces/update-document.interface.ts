import { Document } from "@prisma/client"

export interface IUpdateDocumentService {
  execute: (params: IUpdateDocumentService.Params) => IUpdateDocumentService.Result
}

export namespace IUpdateDocumentService {
  export type Params = {
    id: string
    userId: string
    data: {
      name?: string
      status?: boolean
    }
  }

  export type Result = Promise<Document>
}
