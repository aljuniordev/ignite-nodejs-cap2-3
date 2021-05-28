import { Request, Response } from "express";
import { container } from "tsyringe";


class SendForgotPasswordMailController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {email} = request.body;
        // const sendForgotPasswordMailUseCase = container(SendForgotPasswordMailUseCase);
        return response;
    }
}

export {SendForgotPasswordMailController}