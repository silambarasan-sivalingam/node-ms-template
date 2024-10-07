import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/tickct-created-publisher';

console.clear();
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher Connected to NATS');

    const publisher = new TicketCreatedPublisher(stan);
    try {
         publisher.publish({
            id: '123',
            title: 'concert',
            price: 20
        });
    } catch (err) {
        console.error(err);
    }

    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'concert',
    //     price: 20
    // })

    // stan.publish('ticket:created', data, () => {
    //     console.log('Event Published');
    // })
});