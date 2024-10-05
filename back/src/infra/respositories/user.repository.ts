import {
  ICreateUserRepository,
  IFindUserByIdRepository,
  IDeleteUserRepository,
  IUpdateUserRepository,
  IFindUserByEmailRepository,
} from "~/domain/repositories/users"
import { prisma } from "../db/prisma"

export class UserRepository
  implements
    ICreateUserRepository,
    IFindUserByIdRepository,
    IDeleteUserRepository,
    IUpdateUserRepository,
    IFindUserByEmailRepository
{
  async create(params: ICreateUserRepository.Params): ICreateUserRepository.Result {
    return await prisma.user.create({
      data: {
        email: params.email,
        name: params.name,
        password: params.password,
      },
    })
  }

  async findByEmail(email: string): IFindUserByEmailRepository.Result {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async findById(id: string): IFindUserByIdRepository.Result {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  async delete(id: string): IDeleteUserRepository.Result {
    return await prisma.user.delete({
      where: { id },
    })
  }

  async update(params: IUpdateUserRepository.Params): IUpdateUserRepository.Result {
    return await prisma.user.update({
      where: { id: params.id },
      data: {
        email: params.data.email,
        name: params.data.name,
      },
    })
  }
}
