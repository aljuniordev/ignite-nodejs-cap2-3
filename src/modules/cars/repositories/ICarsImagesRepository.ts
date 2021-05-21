import { CarImage } from "../infra/typeorm/entities/CarImage";
import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";

interface ICarsImagesRepository {
    create({car_id, image_name}: ICreateCarImageDTO): Promise<CarImage>;
}

export {ICarsImagesRepository}