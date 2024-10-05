import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { IUpdateUserDTO, updateUserDTO } from "./dto"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { IUpdateUserService } from "~/domain/services/users/interfaces/update-user.interface"

export class UpdateUserController implements IController {
  constructor(private readonly updateUserService: IUpdateUserService) {}

  async handle(req: Request, res: Response) {
    const userId = req.userId
    if (!userId) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }

    let body: IUpdateUserDTO | undefined = undefined
    try {
      body = updateUserDTO.parse(req.body)
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid body",
        statusCode: 400,
      })
    }

    await this.updateUserService.execute({
      id: userId,
      data: body,
    })

    return res.status(200).json({ message: "OK" })
  }
}
