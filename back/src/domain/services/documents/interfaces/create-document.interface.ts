import { Document } from "@prisma/client"

export interface ICreateDocumentService {
  execute: (params: ICreateDocumentService.Params) => ICreateDocumentService.Result
}

export namespace ICreateDocumentService {
  export type Params = {
    name: string
    userId: string
    status: boolean
  }

  export type Result = Promise<Document>
}
