import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // armazena o token enviado na requisição
  const authToken = req.headers.authorization;

  // verifica se o usuário enviou um token na requisição
  if (!authToken) {
    return res.status(401).end();
  }

  // Essa vírgula faz ignorar o primeiro elemento quando faz o split
  // Peguei o token e dividi, peguei somente o que vem na segunda posição
  const [, token] = authToken.split(" ");

  try {
    // validação do token
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;
    req.user_id = sub;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
}
