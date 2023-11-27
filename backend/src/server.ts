// Importações
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"; // Tratamento de erros do servidor
import cors from "cors";
import path from "path";

import { router } from "./routes";

// A aplicação será executada pelo servidor express
const app = express();

// Passando para o servidor que a comunicação de Request será através de JSON
app.use(express.json());

// Se o router não for o primeiro, não será possível fazer a requisição, porque a ordem importa
// Definindo que a aplicação utilizará as rotas fornecidas no arquivo routes.ts
app.use(router);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(cors);

// Midleware para tratamento de erros em rotas
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Verificação se o conteúdo do parametro err é um tipo erro(tipo Error)
  // Se o valor recebido for uma instância do tipo erro
  // Quando for uma instância de erro, quer dizer que vai ser um erro na requisição, um erro 400
  if (err instanceof Error) {
    // Retorna um HTTP Code 400 e uma mensagem
    return res.status(400).json({
      error: err.message,
    });
  }

  /* Caso não seja um erro na requisição, mas um erro no servidor
 será retornado um status code 500, Erro interno */
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error.",
  });
});

// A aplicação rodará na porta 3333
app.listen(3333, () => console.log(`Servidor ON`));
