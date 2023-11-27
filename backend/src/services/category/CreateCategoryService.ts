import prismaClient from "../../prisma";

interface CategoryRequest {
  nome: string;
}

class CreateCategoryService {
  async execute({ nome }: CategoryRequest) {
    if (nome === "") {
      throw new Error("Categoria inválida!");
    }

    const category = await prismaClient.categoria.create({
      data: {
        nome: nome,
      },
      select: {
        id: true,
        nome: true,
      },
    });

    return category;
  }
}
export { CreateCategoryService };
