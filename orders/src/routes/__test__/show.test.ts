import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/Order';
import { Ticket } from '../../models/Ticket';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '../../models/Ticket';

it ('fetches the order', async () => {  

    // Create a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });

    await ticket.save();


    const user = global.signin();

    // make a request to build an order with this ticket
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);



    // make request to fetch the order

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);

});

it ('returns an error if one user tries to fetch another user order', async () => {
    // Create a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });

    await ticket.save();


    const user = global.signin();

    // make a request to build an order with this ticket

});