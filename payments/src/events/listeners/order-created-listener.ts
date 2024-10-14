import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@silambarasansivalingam/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {

    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const order = Order.build({
            id: data.id,
            version: data.version,
            userId: data.userId,
            price: data.ticket.price,
            status: data.status
        });
        
        await order.save();

        msg.ack();
}
}


// onMessage(data: { id: string; version: number; status: OrderStatus; userId: string; expiresAt: string; ticket: { id: string; price: number; }; }, msg: Message): void {
//     throw new Error("Method not implemented.");
// }