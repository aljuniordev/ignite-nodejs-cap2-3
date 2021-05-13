import {Router} from "express";
import {AuthenticateUserController} from "../modules/accounts/userCases/authenticateUser/AuthenticateUserController"

const authenticateRoutes = Router();

authenticateRoutes.post("/login", new AuthenticateUserController().handle);

export{authenticateRoutes};