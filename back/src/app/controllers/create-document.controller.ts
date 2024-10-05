import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { ICreateDocumentService } from "~/domain/services/documents/interfaces"
import { createDocumentDTO, ICreateDocumentDTO } from "./dto"

export class CreateDocumentController implements IController {
  constructor(private readonly createDocumentService: ICreateDocumentService) {}

  async handle(req: Request, res: Response) {
    const userId = req.userId
    if (!userId) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }

    let body: ICreateDocumentDTO | undefined = undefined
    try {
      body = createDocumentDTO.parse(req.body)
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid body",
        statusCode: 400,
      })
    }

    const newDocument = await this.createDocumentService.execute({
      userId,
      ...body,
    })

    return res.status(200).json(newDocument)
  }
}
