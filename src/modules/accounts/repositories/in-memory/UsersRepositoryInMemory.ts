import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = [];

    async create({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const newUser = new User();

        Object.assign(newUser, { name, 
            password, 
            email, 
            driver_license });
        
        this.users.push(newUser);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

    async listAll(): Promise<User[]> {
        return this.users;
    }

}

export {UsersRepositoryInMemory}