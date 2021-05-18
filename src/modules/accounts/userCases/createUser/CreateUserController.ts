import {Request, Response} from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, email, driver_license } = request.body;

        const createCategoryUseCase = container.resolve(CreateUserUseCase);

        await createCategoryUseCase.execute({name, password, email, driver_license});

        return response.status(201).send();
    }
}

export {CreateUserController};