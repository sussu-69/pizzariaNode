import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
  async handle(req: Request, res: Response) {
    const { minutes } = req.body;
    const listOrderService = new ListOrderService();
    const orders = await listOrderService.execute(minutes);

    return res.json(orders);
  }
}

export { ListOrderController };
