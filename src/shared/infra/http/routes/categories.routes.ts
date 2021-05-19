import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

categoriesRoutes.post("/", new CreateCategoryController().handle);

categoriesRoutes.get("/", new ListCategoriesController().handle);

const uploadAvatar = multer(uploadConfig.upload("./tmp"));
categoriesRoutes.post("/import", uploadAvatar.single("avatar"), new ImportCategoryController().handle);

export { categoriesRoutes };
