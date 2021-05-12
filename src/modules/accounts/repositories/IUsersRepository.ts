import { User } from "../entities";
import {ICreateUserDTO} from "../dtos/ICreateUserDTO";

interface IUsersRepository {
    create({name, password, email, driver_license}: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export {IUsersRepository};
