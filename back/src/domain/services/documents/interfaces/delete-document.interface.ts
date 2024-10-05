import { Document } from "@prisma/client"

export interface IDeleteDocumentService {
  execute: (params: IDeleteDocumentService.Params) => IDeleteDocumentService.Result
}

export namespace IDeleteDocumentService {
  export type Params = {
    id: string
    userId: string
  }

  export type Result = Promise<Document>
}
