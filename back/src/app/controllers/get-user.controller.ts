import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { IGetUserByIdService } from "~/domain/services/users/interfaces"

export class GetUserController implements IController {
  constructor(private readonly getUserById: IGetUserByIdService) {}

  async handle(req: Request, res: Response) {
    const userId = req.userId
    if (!userId) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }

    const user = await this.getUserById.execute(userId)
    if (!user) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }
    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  }
}
