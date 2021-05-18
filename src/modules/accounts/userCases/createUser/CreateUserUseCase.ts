import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {};

    async execute({name, password, email, driver_license}:ICreateUserDTO): Promise<void> {
        if (await this.usersRepository.findByEmail(email)) {
            throw new AppError('Já existe um usuário com este e-mail');
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name, 
            password: passwordHash, 
            email, 
            driver_license
        });
    }
}

export {CreateUserUseCase};