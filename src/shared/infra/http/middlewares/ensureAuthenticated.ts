import { Request, Response, NextFunction } from "express";
import {verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing.", 401);
    }

    //Bearer 123125124123123
    //[0] = Bearer
    //[1] = 123125124123123
    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(token, "c423b5e35b51763d75c2b99296c24515") as IPayLoad;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(userId);

        if (!user) {
            throw new AppError("User not found", 401);
        }

        //não deu erro pq sobrescrevi o express na pasta @types
        request.user = {
            id: userId,
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
