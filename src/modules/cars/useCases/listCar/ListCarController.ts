import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarUseCase } from "./ListCarUseCase";

class ListCarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listCarController = container.resolve(ListCarUseCase);

        return response.json(await listCarController.execute());
    }

}

export {ListCarController}