import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError, validateRequest } from '@silambarasansivalingam/common';
import { body } from 'express-validator';


const router = express.Router()

router.post('/api/orders', 
  [
    body('ticketId').not().isEmpty().withMessage('TicketId must be provided')
  ],
  async (req: Request, res: Response) => {
    res.send({});
});

export { router as newOrderRouter };