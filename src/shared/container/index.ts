import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<IUsersRepository> (
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICategoriesRepository> (
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository> (
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<ICarsRepository> (
    "CarsRepository",
    CarsRepository
);