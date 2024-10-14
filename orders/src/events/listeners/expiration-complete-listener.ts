import { Listener, Subjects, ExpirationCompleteEvent } from "@silambarasansivalingam/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/Order";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {

    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {

        const order = await Order.findById(data.orderId).populate('ticket');

        if (!order) {
            throw new Error('Order not found');
        }

        order.set({
            status: 'cancelled',
        });
        
        await order.save();

        console.log('Expiration complete event received for orderId:', data.orderId);
        msg.ack();
    }
}

