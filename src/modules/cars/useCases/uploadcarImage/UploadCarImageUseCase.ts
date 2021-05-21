import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {

    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) {}

    async execute({car_id, images_name}: IRequest): Promise<void> {
        
        if (!images_name) {
            throw new AppError("Images is necessary!");
        }

        images_name.map(async (image_name) => {
            await this.carsImagesRepository.create({car_id, image_name});
        })
    }
}

export {UploadCarImageUseCase}