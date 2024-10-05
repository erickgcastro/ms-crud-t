import { IFindUserByIdRepository } from "../../repositories/users"
import { IGetUserByIdService } from "./interfaces"

export class GetUserByIdService implements IGetUserByIdService {
  constructor(private readonly userRepository: IFindUserByIdRepository) {}

  async execute(id: string): IGetUserByIdService.Result {
    return await this.userRepository.findById(id)
  }
}
