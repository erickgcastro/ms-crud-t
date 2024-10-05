import argon2d from "argon2"
import { ICreateUserRepository } from "../../repositories/users"
import { ICreateUserService } from "./interfaces"
import { NetworkError } from "../../entities/network-error.entity"

export class CreateUserService implements ICreateUserService {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  async execute(params: ICreateUserService.Params): ICreateUserService.Result {
    const hashedPassword = await argon2d.hash(params.password)

    try {
      return await this.userRepository.create({
        email: params.email,
        name: params.name,
        password: hashedPassword,
      })
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid email",
        statusCode: 400,
      })
    }
  }
}
