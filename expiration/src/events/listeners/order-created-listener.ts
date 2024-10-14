
import { Listener, OrderCreatedEvent, Subjects } from '@silambarasansivalingam/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expirtationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this many milliseconds to process the job:', delay);

        await expirtationQueue.add({
            orderId: data.id
        }, {
            delay: delay
        });

        msg.ack();
    }

}