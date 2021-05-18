export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    //default vai ser 400
    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
