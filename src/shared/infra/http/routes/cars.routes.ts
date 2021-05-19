import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListCarController } from "../../../../modules/cars/useCases/listCar/listCarController";

const carsRoutes = Router();

carsRoutes.post("/", ensureAdmin, new CreateCarController().handle);
carsRoutes.get("/", ensureAdmin, new ListCarController().handle);

export { carsRoutes };
