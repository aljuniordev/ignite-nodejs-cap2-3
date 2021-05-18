import { User } from "../infra/typeorm/entities";
import {ICreateUserDTO} from "../dtos/ICreateUserDTO";

interface IUsersRepository {
    create({name, password, email, driver_license}: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    listAll(): Promise<User[]>;
}

export {IUsersRepository};
