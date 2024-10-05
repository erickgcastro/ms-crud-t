import { Router } from "express"
import {
  createDocumentControllerFactory,
  createUserControllerFactory,
  deleteDocumentControllerFactory,
  deleteUserControllerFactory,
  getUserControllerFactory,
  ListDocumentsByUserControllerFactory,
  signinControllerFactory,
  updateDocumentControllerFactory,
  updateUserControllerFactory,
} from "./factory"
import { decodeUserTokenMiddleware } from "./middlewares/decode-user-token.middleware"

export const routes = Router()

routes.post("/", (_, res) => res.json({ message: "ping" }))

routes.post("/auth/signin", signinControllerFactory)

routes.post("/users", createUserControllerFactory)

routes.get("/users/me", decodeUserTokenMiddleware, getUserControllerFactory)

routes.put("/users", decodeUserTokenMiddleware, updateUserControllerFactory)

routes.delete("/users", decodeUserTokenMiddleware, deleteUserControllerFactory)

routes.post(
  "/users/documents",
  decodeUserTokenMiddleware,
  createDocumentControllerFactory
)

routes.get(
  "/users/documents",
  decodeUserTokenMiddleware,
  ListDocumentsByUserControllerFactory
)

routes.put(
  "/users/documents/:id",
  decodeUserTokenMiddleware,
  updateDocumentControllerFactory
)

routes.delete(
  "/users/documents/:id",
  decodeUserTokenMiddleware,
  deleteDocumentControllerFactory
)
