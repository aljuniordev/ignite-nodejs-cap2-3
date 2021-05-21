import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/rentalCreate/RentalCreateController";
import { RentalListController } from "@modules/rentals/useCases/rentalList/RentalListController";

const rentalsRoutes = Router();

rentalsRoutes.post("/", new CreateRentalController().handle);
rentalsRoutes.get("/", new RentalListController().handle);

export { rentalsRoutes };
