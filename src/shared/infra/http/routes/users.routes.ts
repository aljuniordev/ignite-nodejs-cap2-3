import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/userCases/createUser/CreateUserController";
import { ListUserController } from "../../../../modules/accounts/userCases/listUser/ListUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

usersRoutes.post("/", new CreateUserController().handle);

usersRoutes.get("/", new ListUserController().handle);

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), new UpdateUserAvatarController().handle);

export { usersRoutes };
