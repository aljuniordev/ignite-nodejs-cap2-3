import fs from "fs";
import csvParse from "csv-parse";

import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import AppError from "@errors/AppError";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject("SpecificationRepository")
        private categoryRepository: ICategoriesRepository
    ) {}

    loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
        //coloco tudo dentro de uma promisse para esperar de ler o arquivo inteiro para devolver
        return new Promise((resolve, reject) => {
            //converte arquivo pra stream, que é necessário para não travar o servidor quando for um arquivo grande
            //porque o stream são partes pequenas do arquivo para serem processadas aos poucos
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            //biblioteca que divide os arquivos seguindo o padrao que é virgula
            const parseFile = csvParse();

            //joga cada parte para outro lugar e o csvParse, transforma cada linha e um array dividido por virgula
            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;

                categories.push({
                    name,
                    description
                });
            })
            //aqui estou dizendo que quando terminar toda a leitura, eu coloco o resultado no resolve da promisse
            .on("end", () => {
                //exlcui o arquivo
                fs.promises.unlink(file.path);
                resolve(categories)
            })
            .on("error", (err) => {
                fs.promises.unlink(file.path);
                reject(err)
            })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategory(file);
        
        categories.map(async category => {
            const {name, description} = category;

            const existCategory = this.categoryRepository.findByName(name);

            if (!existCategory) {
                this.categoryRepository.create({
                    name,
                    description
                })
            }
        })
    }
}

export {ImportCategoryUseCase}
function Injectable() {
    throw new AppError("Function not implemented.");
}

