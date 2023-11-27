import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthUserService {
  async execute({ email, senha }: AuthRequest) {
    // Verifica se o e-mail está cadastrado
    const user = await prismaClient.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email não cadastrado!");
    }

    // Verificar se a senha está correta
    const senhaMatch = await compare(senha, user.senha);

    if (!senhaMatch) {
      throw new Error("Senha incorreta!");
    }

    const token = sign(
      // payload
      {
        nome: user.nome,
        usuario: user.email,
      },
      // senha usada, pega das variáveis de ambiente
      process.env.JWT_SECRET,
      // dados opcionais
      {
        subject: user.id,
        expiresIn: "10m",
      }
    );
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
