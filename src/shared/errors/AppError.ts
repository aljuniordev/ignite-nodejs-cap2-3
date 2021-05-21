import { QueryFailedError } from "typeorm";

export default class AppError {

    // public readonly message: string | QueryFailedError;
    public readonly message: string;

    public readonly statusCode: number;

    //default vai ser 400
    constructor(message, statusCode = 400) {

        this.statusCode = statusCode;
        this.message = message;

        // if (!message.code) {
        //     this.message = message;
        // } else {
        //     this.message = message.message;

        //     if (message.code === "22P02") {
        //         this.message = "Invalid input type ### " + this.message; 
        //     }
        // }
    }
}
