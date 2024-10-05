import { Request, Response } from "express"
import { UserRepository } from "~/infra/respositories/user.repository"
import {
  CreateUserService,
  GetUserByIdService,
  DeleteUserService,
  UpdateUserService,
} from "~/domain/services/users"
import {
  CreateUserController,
  GetUserController,
  UpdateUserController,
  DeleteUserController,
  CreateDocumentController,
  UpdateDocumentController,
  ListDocumentsByUserController,
  DeleteDocumentController,
} from "./controllers"
import { DocumentRepository } from "~/infra/respositories/document.repository"
import {
  CreateDocumentService,
  DeleteDocumentService,
  ListDocumentsByUserService,
  UpdateDocumentService,
} from "~/domain/services/documents"
import { AuthSigninController } from "./controllers/signin.controller"
import { FindUserByEmailService } from "~/domain/services/users/find-user-by-email.service"

export const signinControllerFactory = (req: Request, res: Response) => {
  const userRepository = new UserRepository()
  const userService = new FindUserByEmailService(userRepository)
  const controller = new AuthSigninController(userService)
  return controller.handle(req, res)
}

export const createUserControllerFactory = (req: Request, res: Response) => {
  const userRepository = new UserRepository()
  const userService = new CreateUserService(userRepository)
  const controller = new CreateUserController(userService)
  return controller.handle(req, res)
}

export const updateUserControllerFactory = (req: Request, res: Response) => {
  const userRepository = new UserRepository()
  const userService = new UpdateUserService(userRepository)
  const controller = new UpdateUserController(userService)
  return controller.handle(req, res)
}

export const getUserControllerFactory = (req: Request, res: Response) => {
  const userRepository = new UserRepository()
  const userService = new GetUserByIdService(userRepository)
  const controller = new GetUserController(userService)
  return controller.handle(req, res)
}

export const deleteUserControllerFactory = (req: Request, res: Response) => {
  const userRepository = new UserRepository()
  const userService = new DeleteUserService(userRepository)
  const controller = new DeleteUserController(userService)
  return controller.handle(req, res)
}

export const createDocumentControllerFactory = (req: Request, res: Response) => {
  const documentRepository = new DocumentRepository()
  const documentService = new CreateDocumentService(documentRepository)
  const controller = new CreateDocumentController(documentService)
  return controller.handle(req, res)
}

export const updateDocumentControllerFactory = (req: Request, res: Response) => {
  const documentRepository = new DocumentRepository()
  const documentService = new UpdateDocumentService(documentRepository)
  const controller = new UpdateDocumentController(documentService)
  return controller.handle(req, res)
}

export const ListDocumentsByUserControllerFactory = (req: Request, res: Response) => {
  const documentRepository = new DocumentRepository()
  const documentService = new ListDocumentsByUserService(documentRepository)
  const controller = new ListDocumentsByUserController(documentService)
  return controller.handle(req, res)
}

export const deleteDocumentControllerFactory = (req: Request, res: Response) => {
  const documentRepository = new DocumentRepository()
  const documentService = new DeleteDocumentService(documentRepository)
  const controller = new DeleteDocumentController(documentService)
  return controller.handle(req, res)
}
