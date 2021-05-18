import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

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