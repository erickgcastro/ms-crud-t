import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { IListDocumentsByUserService } from "~/domain/services/documents/interfaces"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { IListDocumentsQueryDTO, listDocumentsQueryDTO } from "./dto"

export class ListDocumentsByUserController implements IController {
  constructor(private readonly listDocumentsByUserService: IListDocumentsByUserService) {}

  async handle(req: Request, res: Response) {
    const userId = req.userId
    if (!userId) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }

    let query: IListDocumentsQueryDTO | undefined = undefined
    try {
      query = listDocumentsQueryDTO.parse(req.query)
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid queries",
        statusCode: 400,
      })
    }

    const startIndex = (query.page - 1) * query.limit
    const endIndex = query.page * query.limit

    const list = await this.listDocumentsByUserService.execute(userId)

    const data = list.slice(startIndex, endIndex)
    return res.status(200).json(data)
  }
}
