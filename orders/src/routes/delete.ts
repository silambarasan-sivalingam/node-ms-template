import { DeleteOperation } from './../../node_modules/mongodb/src/operations/delete';
import express, { Request, Response } from 'express';
import { NotFoundError } from '@silambarasansivalingam/common';

const router = express.Router()

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
    res.send({});
});

export { router as deleteOrderRouter };