import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe(("Tests Authenticate User"), () => {
    
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const newUser: ICreateUserDTO = {
            driver_license: "000123",
            email: "usertest.com",
            password: "1234",
            name: "User test"
        }

        await createUserUseCase.execute(newUser);

        const resul = await authenticateUserUseCase.execute({
            email: newUser.email,
            password: newUser.password
        });

        expect(resul).toHaveProperty("token");
    });

    it("should not be able to authenticate am nonexistent user", async () => {
        expect(async() => {
            await authenticateUserUseCase.execute({
                email: "emailfalse@gmail.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", async () => {
        expect(async() => {
            const newUser: ICreateUserDTO = {
                driver_license: "000123",
                email: "usertest.com",
                password: "1234",
                name: "User test"
            }

            await createUserUseCase.execute(newUser);

            const resul = await authenticateUserUseCase.execute({
                email: newUser.email,
                password: "2222"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
