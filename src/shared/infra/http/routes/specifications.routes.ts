import { Router } from "express";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

specificationsRoutes.post("/", new CreateSpecificationController().handle);

specificationsRoutes.get("/", new ListSpecificationsController().handle);

export { specificationsRoutes };
 