import { NextFunction, Request, Response } from "express"
import JWT from "jsonwebtoken"
import { NetworkError } from "~/domain/entities/network-error.entity"

export const decodeUserTokenMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization

    if (!auth || !auth.startsWith("Bearer ")) {
      throw new Error()
    }

    const token = auth.split(" ")[1]
    const payload = JWT.verify(token, process.env.JWT_SECRET) as {
      id: string
    }

    if (!payload.id) throw new Error()

    req.userId = payload.id

    return next()
  } catch (error) {
    throw new NetworkError({
      errorMessage: "Invalid token",
      statusCode: 401,
    })
  }
}
