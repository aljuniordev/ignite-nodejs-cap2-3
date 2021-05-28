import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";


@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(email: string): Promise<void> {
        
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("User not found!");
        }

        
    } 
}

export {SendForgotPasswordMailUseCase}