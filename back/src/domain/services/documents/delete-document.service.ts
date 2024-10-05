import { IDeleteDocumentRepository } from "~/domain/repositories/documents"
import { IDeleteDocumentService } from "./interfaces"

export class DeleteDocumentService implements IDeleteDocumentService {
  constructor(private readonly documentRepository: IDeleteDocumentRepository) {}

  async execute(params: IDeleteDocumentService.Params): IDeleteDocumentService.Result {
    return await this.documentRepository.delete(params)
  }
}
