import { Listener, Subjects, ExpirationCompleteEvent } from "@silambarasansivalingam/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {

    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        console.log('Expiration complete event received for orderId:', data.orderId);
        msg.ack();
    }
}

