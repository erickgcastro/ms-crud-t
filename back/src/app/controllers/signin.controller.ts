import { Request, Response } from "express"
import argon2 from "argon2"
import JWT from "jsonwebtoken"

import { IController } from "../interface/controller.interface"
import { ISigninDTO, signinDTO } from "./dto"
import { NetworkError } from "~/domain/entities/network-error.entity"
import { IFindUserByEmailService } from "~/domain/services/users/interfaces"

export class AuthSigninController implements IController {
  constructor(private readonly findUserByEmailService: IFindUserByEmailService) {}

  async handle(req: Request, res: Response) {
    let body: ISigninDTO | undefined = undefined
    try {
      body = signinDTO.parse(req.body)
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid body",
        statusCode: 400,
      })
    }

    const user = await this.findUserByEmailService.execute(body.email)
    if (!user) {
      throw new NetworkError({
        errorMessage: "Invalid email or password",
        statusCode: 400,
      })
    }

    const checkPassword = await argon2.verify(user.password, body.password)
    if (!checkPassword) {
      throw new NetworkError({
        errorMessage: "Invalid email or password",
        statusCode: 400,
      })
    }

    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    return res.status(200).json({ access_token: token })
  }
}
