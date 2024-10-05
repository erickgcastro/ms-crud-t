import { IDeleteUserRepository } from "../../repositories/users"
import { IDeleteUserService } from "./interfaces"

export class DeleteUserService implements IDeleteUserService {
  constructor(private readonly userRepository: IDeleteUserRepository) {}

  async execute(id: string): IDeleteUserService.Result {
    return await this.userRepository.delete(id)
  }
}
