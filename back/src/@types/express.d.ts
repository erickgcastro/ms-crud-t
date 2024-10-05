import { User } from "~/domain/entities"

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}
