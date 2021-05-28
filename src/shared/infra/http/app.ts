import "express-async-errors";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import statusMonitor from "express-status-monitor";
import swaggerUi from "swagger-ui-express";

import createConnection from "../typeorm";
import "@shared/container";
import AppError from "@errors/AppError";

import swaggerFile from "../../../swagger.json";
import {router} from "./routes";

createConnection();

const app = express();
//TEM QUE SER O PRIMEIRO. Esconde todas as informações da rota para evitar hacker
app.use(helmet());
//comprimi listas grandes melhorando a qualidade da rota
app.use(compression());
// faz o express receber requisicao json
app.use(express.json());
//transforma os objetos vindo no formato de json, usando a biblioteca QS do express
app.use(express.urlencoded({ extended:true}));
//cria o servidor swagger para as rotas publicas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
//adiciona as rotas
app.use(router);
//cria um monitor para visualizar, digite IP/servermonitor para ver processos
app.use(statusMonitor({path: "/servermonitor"}));
//trata os erros do express
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
            type: err.type
        });
    }
    
    return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`,
    });
});

export {app};