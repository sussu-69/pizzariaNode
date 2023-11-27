import { Response, Request } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const id_pedido = req.query.id_pedido as string;
    const finishOrderService = new FinishOrderService();
    const order = await finishOrderService.execute({ id_pedido });
    return res.json(order);
  }
}

export { FinishOrderController };
