import Queue from 'bull'
import { ExpirationCompletePublisher } from '../events/publisher/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

export { ExpirationCompletePublisher }

interface Payload {
    orderId: string;
}

const expirtationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST,
    },
    });

expirtationQueue.process(async (job) => {
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId
    });
    console.log('I want to publish an expiration:complete event for orderId', job.data.orderId);
});

export { expirtationQueue }