import { container } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<IUsersRepository> ("UsersRepository", UsersRepository );
container.registerSingleton<ICategoriesRepository> ("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationRepository> ("SpecificationRepository", SpecificationRepository);
container.registerSingleton<ICarsRepository> ("CarsRepository", CarsRepository);
container.registerSingleton<ICarsImagesRepository> ("CarsImagesRepository", CarsImagesRepository);
container.registerSingleton<IRentalsRepository> ("RentalsRepository", RentalsRepository);
