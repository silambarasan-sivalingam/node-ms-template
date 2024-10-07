import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';

export class TicketCreatedListener extends Listener {
    subject: string = 'ticket:created';
    queueGroupName = 'payments-service';

    onMessage(data: any, msg: Message) {
        console.log('Event Data!', data);

        console.log(data.id);
        console.log(data.title);
        console.log(data.price);


        msg.ack();
    }
}
