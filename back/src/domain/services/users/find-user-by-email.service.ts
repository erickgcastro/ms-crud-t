import {
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
} from "../../repositories/users"
import { IFindUserByEmailService } from "./interfaces"

export class FindUserByEmailService implements IFindUserByEmailService {
  constructor(private readonly userRepository: IFindUserByEmailRepository) {}

  async execute(email: string): IFindUserByEmailService.Result {
    return await this.userRepository.findByEmail(email)
  }
}
