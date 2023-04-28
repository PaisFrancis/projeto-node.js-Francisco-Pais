import env from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { verifyToken } from "./middleware/token";
import router from "./routes";

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`[${request.method}] => url:: ${request.url}`);

  next();
};

app.use(requestLogger);

app.use(verifyToken);

app.use(router);

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);

// https://www.prisma.io

// npm i prisma -D

// npx prisma init

// npx prisma migrate dev --name initial

// npm i @prisma/client

// caso não consigam migrar para a base da dados de casa usar o comando npx migrate reset

// Se o modelo for criado no workbench usar este comando para criar a configuração do prisma
// npx prisma db pull

// Se for só preciso atualizar o prisma client
// npx prisma generate
