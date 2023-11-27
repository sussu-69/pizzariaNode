import prismaClient from "../../prisma";

class ListOrderService {
  async execute(minutes: number) {
    const now = new Date();
    const initTime = new Date(now.getTime() - minutes * 60000);

    const orders = await prismaClient.pedido.findMany({
      where: {
        criado_em: {
          gte: initTime.toISOString(),
        },
      },
      orderBy: {
        criado_em: "desc",
      },
    });

    return orders;
  }
}

export { ListOrderService };
