import { inject, injectable } from "tsyringe";
import {User} from "../../infra/typeorm/entities"
import { IUsersRepository } from "../../repositories/IUsersRepository";

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