import { Request, Response } from "express";
import { container } from "tsyringe";
import { RentalListUseCase } from "./RentalListUseCase";

class RentalListController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {car_id, user_id} = request.body;
        
        const rentalListUseCase = container.resolve(RentalListUseCase);

        const rentals = await rentalListUseCase.execute({
            car_id, user_id
        });

        return response.json(rentals);
    }
    
}

export {RentalListController}