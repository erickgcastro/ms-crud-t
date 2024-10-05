import { ICreateDocumentService } from "./interfaces"
import { ICreateDocumentRepository } from "~/domain/repositories/documents"

export class CreateDocumentService implements ICreateDocumentService {
  constructor(private readonly documentRepository: ICreateDocumentRepository) {}

  async execute(params: ICreateDocumentService.Params): ICreateDocumentService.Result {
    return await this.documentRepository.create({
      status: params.status,
      name: params.name,
      userId: params.userId,
    })
  }
}
