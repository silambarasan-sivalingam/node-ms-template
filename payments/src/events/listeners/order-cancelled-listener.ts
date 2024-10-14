import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@silambarasansivalingam/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { idText } from "typescript";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {

    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const order = await Order.findOne({
            id: data.id,
            version: data.version - 1
        });

        if (!order) {
            throw new Error('Order not found');
        }

        order.set({ status: OrderStatus.Cancelled });
        await order.save();
        

        msg.ack();
}
}


// onMessage(data: { id: string; version: number; status: OrderStatus; userId: string; expiresAt: string; ticket: { id: string; price: number; }; }, msg: Message): void {
//     throw new Error("Method not implemented.");
// }