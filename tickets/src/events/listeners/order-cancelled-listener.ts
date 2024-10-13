import { Listener, OrderCancelledEvent, Subjects } from "@silambarasansivalingam/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        msg.ack();
    }
}