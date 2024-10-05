import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { IDeleteUserService } from "~/domain/services/users/interfaces"

export class DeleteUserController implements IController {
  constructor(private readonly deletUserService: IDeleteUserService) {}

  async handle(req: Request, res: Response) {
    const userId = req.userId
    if (!userId) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }

    const user = await this.deletUserService.execute(userId)
    if (!user) {
      throw new NetworkError({
        errorMessage: "Invalid token",
        statusCode: 401,
      })
    }
    return res.status(200).json({ message: "OK" })
  }
}
