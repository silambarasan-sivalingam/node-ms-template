import express, { Request, Response } from 'express';
import { NotFoundError, OrderStatus, NotAuthorizedError } from '@silambarasansivalingam/common';
import { Order } from '../models/Order';


const router = express.Router()

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!
    res.send({});
});

export { router as deleteOrderRouter };