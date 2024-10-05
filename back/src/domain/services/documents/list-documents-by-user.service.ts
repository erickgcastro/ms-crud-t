import { IListDocumentsByUserRepository } from "~/domain/repositories/documents"
import { IListDocumentsByUserService } from "./interfaces"

export class ListDocumentsByUserService implements IListDocumentsByUserService {
  constructor(private readonly documentRepository: IListDocumentsByUserRepository) {}

  async execute(userId: string): IListDocumentsByUserService.Result {
    return await this.documentRepository.list(userId)
  }
}
