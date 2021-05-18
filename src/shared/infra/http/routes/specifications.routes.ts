import { Router } from "express";
import {ensureAuthenticated} from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post("/", new CreateSpecificationController().handle);

specificationsRoutes.get("/", new ListSpecificationsController().handle);

export { specificationsRoutes };
