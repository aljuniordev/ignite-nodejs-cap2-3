import { QueryFailedError } from "typeorm";

export default class AppError {

    public readonly message: string | QueryFailedError;
    public readonly type: string;
    public readonly statusCode: number;

    //default vai ser 400
    constructor(message, statusCode = 400) {

        this.statusCode = statusCode;

        if (!message.code) {
            this.message = message;
            this.type = "Error UseCase";
        } else {
            this.message = message.message;
            this.type = "Error Database";

            if (message.code === "22P02") {
                this.message = "Invalid input type ### " + this.message; 
            }
        }
    }
}
