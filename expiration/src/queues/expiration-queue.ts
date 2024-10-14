import Queue from 'bull'

interface Payload {
    orderId: string;
}

const expirtationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST,
    },
    });

expirtationQueue.process(async (job) => {
    console.log('Publish an expiration:complete event for orderId', job.data.orderId);
});

export { expirtationQueue }