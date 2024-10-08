import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { requireAuth, NotFoundError, validateRequest } from '@silambarasansivalingam/common';
import { body } from 'express-validator';
import { Ticket } from '../models/Ticket';
import { Order } from '../models/Order';


const router = express.Router()

router.post('/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Find the ticket the user is trying to order in the database
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    res.send({});
  });

  //Make sure that this ticket is not already reserved

  //Calculate an expiration date for this order

  //Build the order and save it to the database

  //Publish an event saying that an order was created

export { router as newOrderRouter };