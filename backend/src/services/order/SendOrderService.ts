import prismaClient from "../../prisma";

interface OrderRequest {
  id_pedido: string;
}

class SendOrderService {
  async execute({ id_pedido }: OrderRequest) {
    const item = await prismaClient.item.findFirst({
      where: {
        id_pedido: id_pedido,
      },
    });

    if (!item) {
      throw new Error("Pedido está vazio, não é possível enviar.");
    }

    const order = await prismaClient.pedido.update({
      where: {
        id: id_pedido,
      },
      data: {
        status: true,
        rascunho: false,
        
      },
    });
    return order;
  }
}

export { SendOrderService };
