import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@silambarasansivalingam/common";
import { queueGroupName } from "./queue-group-name";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }
}
