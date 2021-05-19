import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarUseCase } from "./ListCarUseCase";

class ListCarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {brand, category_id, name, available} = request.query;

        const availableTrat = ((!available) ? null : (available === "true") ? true : false); 

        const listCarController = container.resolve(ListCarUseCase);

        const cars = await listCarController.execute({
            brand: brand as string,
            category_id: category_id as string, 
            name: name as string, 
            available: availableTrat
        })

        return response.json(cars);
    }

}

export {ListCarController}