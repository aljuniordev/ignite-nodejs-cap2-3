import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post("/", new CreateCategoryController().handle);

categoriesRoutes.get("/",  new ListCategoriesController().handle);

const uploadAvatar = multer(uploadConfig.upload("./tmp"));
categoriesRoutes.post("/import", ensureAuthenticated, uploadAvatar.single("avatar"), new ImportCategoryController().handle);

export { categoriesRoutes };
