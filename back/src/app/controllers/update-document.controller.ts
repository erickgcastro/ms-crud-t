import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { IUpdateDocumentService } from "~/domain/services/documents/interfaces"
import { IUpdateDocumentDTO, updateDocumentDTO } from "./dto"

export class UpdateDocumentController implements IController {
  constructor(private readonly updateDocumentService: IUpdateDocumentService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    const userId = req.userId
    if (!userId) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }

    let body: IUpdateDocumentDTO | undefined = undefined
    try {
      body = updateDocumentDTO.parse(req.body)
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid body",
        statusCode: 400,
      })
    }

    await this.updateDocumentService.execute({
      id,
      userId,
      data: body,
    })

    return res.status(200).json({ message: "OK" })
  }
}
