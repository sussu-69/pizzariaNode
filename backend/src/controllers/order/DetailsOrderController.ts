import { Request, Response } from "express";
import { DetailsOrderService } from "../../services/order/DetailsOrderService";

class DetailsOrderController {
  async handle(req: Request, res: Response) {
    const id_pedido = req.query.id_pedido as string;
    const detailsOrderService = new DetailsOrderService();
    const order = await detailsOrderService.execute({ id_pedido });
    return res.json(order);
  }
}

export { DetailsOrderController };
