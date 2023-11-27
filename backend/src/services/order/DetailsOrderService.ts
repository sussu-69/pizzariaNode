import prismaClient from "../../prisma";

interface OrderRequest {
  id_pedido: string;
}

class DetailsOrderService {
  async execute({ id_pedido }: OrderRequest) {
    const order = await prismaClient.pedido.findUnique({
      where: {
        id: id_pedido,
      },
    });

    if (!order) {
      throw new Error("Pedido inválido");
    }
    const items = await prismaClient.item.findMany({
      where: {
        id_pedido: id_pedido,
      },
    });

    let produtos = [];

    for (let i = 0; i < items.length; i++) {
      let produto = await prismaClient.produto.findUnique({
        where: {
          id: items[i].id_produto,
        },
      });
      produtos.push({ Quantidade: items[i].quantidade, produto });
    }
    return { Pedido: order, Produtos: produtos };
  }
}

export { DetailsOrderService };
