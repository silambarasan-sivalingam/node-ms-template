import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { requireAuth, NotFoundError, validateRequest, BadRequestError, OrderStatus } from '@silambarasansivalingam/common';
import { body } from 'express-validator';
import { Ticket} from '../models/Ticket';
import { Order } from '../models/Order';


const router = express.Router()

router.get('/api/orders/:orderId',requireAuth, async (req: Request, res: Response) => {

    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    res.send({});
});

export { router as showOrderRouter };