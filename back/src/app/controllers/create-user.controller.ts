import { Request, Response } from "express"
import { type IController } from "../interface/controller.interface"
import { ICreateUserService } from "~/domain/services/users/interfaces"
import { ICreateUserDTO, createUserDTO } from "./dto"
import { NetworkError } from "~/domain/entities/network-error.entity"
import JWT from "jsonwebtoken"

export class CreateUserController implements IController {
  constructor(private readonly createUserService: ICreateUserService) {}

  async handle(req: Request, res: Response) {
    let body: ICreateUserDTO | undefined = undefined
    try {
      body = createUserDTO.parse(req.body)
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid body",
        statusCode: 400,
      })
    }

    const newUser = await this.createUserService.execute(body)

    const token = JWT.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    return res.status(200).json({ access_token: token })
  }
}
