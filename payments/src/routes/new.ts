import { body } from 'express-validator';
import exppress, { Request, Response } from 'express';
import { requireAuth, validateRequest, BadRequestError, NotFoundError } from '@silambarasansivalingam/common';
import { Order} from '../models/order';

const router = exppress.Router();

router.post('/api/payments', requireAuth, [
  body('token').not().isEmpty(),
  body('orderId').not().isEmpty()
], validateRequest, async (req: Request, res: Response) => {
  res.send({ success: true });
});

export { router as createChargeRouter };