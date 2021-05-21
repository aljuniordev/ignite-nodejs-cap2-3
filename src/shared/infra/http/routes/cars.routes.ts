import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarController } from "@modules/cars/useCases/listCar/ListCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadcarImage/UploadCarImageController";

const carsRoutes = Router();

carsRoutes.post("/", ensureAdmin, new CreateCarController().handle);
carsRoutes.get("/", new ListCarController().handle);
carsRoutes.post("/specifications/:id", new CreateCarSpecificationController().handle);

const uploadAvatar = multer(uploadConfig.upload("./tmp/cars"));
carsRoutes.post("/images/:id", uploadAvatar.array("images"), new UploadCarImageController().handle);

export { carsRoutes };
