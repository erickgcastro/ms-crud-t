import {
  ICreateDocumentRepository,
  IDeleteDocumentRepository,
  IFindDocumentByIdRepository,
  IListDocumentsByUserRepository,
  IUpdateDocumentRepository,
} from "~/domain/repositories/documents"
import { prisma } from "../db/prisma"

export class DocumentRepository
  implements
    ICreateDocumentRepository,
    IListDocumentsByUserRepository,
    IDeleteDocumentRepository,
    IUpdateDocumentRepository,
    IFindDocumentByIdRepository
{
  async create(
    params: ICreateDocumentRepository.Params
  ): ICreateDocumentRepository.Result {
    return await prisma.document.create({
      data: {
        name: params.name,
        status: params.status,
        userId: params.userId,
      },
    })
  }

  async list(userId: string): IListDocumentsByUserRepository.Result {
    return await prisma.document.findMany({
      where: { userId },
    })
  }

  async update(
    params: IUpdateDocumentRepository.Params
  ): IUpdateDocumentRepository.Result {
    return await prisma.document.update({
      where: { id: params.id },
      data: {
        name: params.data.name,
        status: params.data.status,
      },
    })
  }

  async findById(id: string): IFindDocumentByIdRepository.Result {
    return await prisma.document.findUnique({
      where: { id },
    })
  }

  async delete(
    params: IDeleteDocumentRepository.Params
  ): IDeleteDocumentRepository.Result {
    return await prisma.document.delete({
      where: { id: params.id, userId: params.userId },
    })
  }
}
