import { inject, injectable } from "tsyringe";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import AppError from "@errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: String,
        email: String
    };
    token: String;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){};

    async execute({email, password}:IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email ou senha incorretos");
        }

        if (!await compare(password, user.password)) {
            throw new AppError("Email ou senha incorretos");
        }
        
        const token = sign({}, "c423b5e35b51763d75c2b99296c24515", {
            subject: user.id,
            expiresIn: "1d" //1h
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export {AuthenticateUserUseCase}