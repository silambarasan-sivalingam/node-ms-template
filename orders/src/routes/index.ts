import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { requireAuth, NotFoundError, validateRequest, BadRequestError, OrderStatus } from '@silambarasansivalingam/common';
import { body } from 'express-validator';
import { Ticket} from '../models/Ticket';
import { Order } from '../models/Order';

const router = express.Router()

router.get('/api/orders', async (req: Request, res: Response) => {

    const orders = await Order.find({
      userId: req.currentUser!.id
    }).populate('ticket');

    res.send(orders);
});

export { router as indexOrderRouter };