import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { IDeleteDocumentService } from "~/domain/services/documents/interfaces"

export class DeleteDocumentController implements IController {
  constructor(private readonly deleteDocumentService: IDeleteDocumentService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params
    const userId = req.userId
    if (!userId) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }

    const user = await this.deleteDocumentService.execute({
      id,
      userId,
    })
    if (!user) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }
    return res.status(200).json({ message: "OK" })
  }
}
