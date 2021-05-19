import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarController } from "@modules/cars/useCases/listCar/ListCarController";

const carsRoutes = Router();

carsRoutes.post("/", ensureAdmin, new CreateCarController().handle);
carsRoutes.get("/", ensureAdmin, new ListCarController().handle);

export { carsRoutes };
