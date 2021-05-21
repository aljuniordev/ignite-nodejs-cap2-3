import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./RentalCreateUseCase";

class CreateRentalController {

    async handle(request: Request, response: Response): Promise<Response> {
        const car_id = request.body.car_id as string;
        const user_id = request.body.user_id as string;

        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        const newRental = await createRentalUseCase.execute({
            car_id, user_id
        });

        return response.json(newRental);
    }

}

export {CreateRentalController}