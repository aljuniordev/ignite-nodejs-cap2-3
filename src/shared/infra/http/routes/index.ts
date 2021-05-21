import {Router} from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { usersRoutes } from "./users.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { carsRoutes } from "./cars.routes";
import { rentalsRoutes } from "./rentals.routes";

const router = Router();

router.use(authenticateRoutes);
router.use(ensureAuthenticated); //todas as rotas depois vão receber esse middleware
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);

export {router};
