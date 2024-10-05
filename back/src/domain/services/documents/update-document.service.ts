import {
  IFindDocumentByIdRepository,
  IUpdateDocumentRepository,
} from "~/domain/repositories/documents"
import { IUpdateDocumentService } from "./interfaces"
import { NetworkError } from "~/domain/entities/network-error.entity"

export class UpdateDocumentService implements IUpdateDocumentService {
  constructor(
    private readonly documentRepository: IUpdateDocumentRepository &
      IFindDocumentByIdRepository
  ) {}

  async execute(params: IUpdateDocumentService.Params): IUpdateDocumentService.Result {
    const document = await this.documentRepository.findById(params.id)
    if (!document || document.userId !== params.userId) {
      throw new NetworkError({
        errorMessage: "Document not found",
        statusCode: 404,
      })
    }
    return await this.documentRepository.update(params)
  }
}
