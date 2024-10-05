import { NextFunction, Request, Response } from "express"
import { NetworkError } from "~/domain/entities/network-error.entity"

export const errorHandlerMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.log(err)

  if (err instanceof NetworkError) {
    return res.status(err.statusCode).json({
      message: err.errorMessage,
    })
  }

  return res.status(500).json({
    error_code: "INTER_SERVER_ERROR",
    error_description: "An unexpected error occurred",
  })
}
