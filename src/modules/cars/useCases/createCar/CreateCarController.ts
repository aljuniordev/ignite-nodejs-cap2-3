import { Request, Response } from "express";
import { container } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";


class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {name, description, daily_rate, license_plate,
            fine_amount, brand, category_id} = request.body;

        if (!name || !description || !category_id) {
            throw new AppError("Missing object fields!");
        }

        const createCarUseCase = container.resolve(CreateCarUseCase);

        const carCreated = await createCarUseCase.execute({name, description, daily_rate, license_plate,
            fine_amount, brand, category_id});

        return response.status(201).json(carCreated);
    }
}

export {CreateCarController}