import { NetworkError } from "../../entities/network-error.entity"
import { IUpdateUserRepository } from "../../repositories/users"
import { IUpdateUserService } from "./interfaces"

export class UpdateUserService implements IUpdateUserService {
  constructor(private readonly userRepository: IUpdateUserRepository) {}

  async execute(params: IUpdateUserService.Params): IUpdateUserService.Result {
    try {
      return await this.userRepository.update(params)
    } catch (error) {
      throw new NetworkError({
        errorMessage: "Invalid email",
        statusCode: 400,
      })
    }
  }
}
