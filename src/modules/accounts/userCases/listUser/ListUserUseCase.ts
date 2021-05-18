import { User } from "@modules/accounts/infra/typeorm/entities";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {};

    async execute(): Promise<User[]> {
        return await this.usersRepository.listAll();
    }
}

export {ListUserUseCase};