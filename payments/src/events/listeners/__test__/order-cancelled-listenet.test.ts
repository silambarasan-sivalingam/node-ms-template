import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { OrderCancelledEvent, OrderStatus } from "@silambarasansivalingam/common";
import { natsWrapper } from "../../../nats-wrapper";


const setup = async () => {

    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 10,
        userId: '123',
        status: OrderStatus.Created
    });

    await order.save();

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: '123'
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, order, data, msg };
}