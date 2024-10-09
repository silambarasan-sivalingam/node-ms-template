import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/Order';
import { Ticket } from '../../models/Ticket';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '../../models/Ticket';

it('return an error if the tickets does not exist', async () => {
const ticketId = new mongoose.Types.ObjectId();

    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ 
      ticketId : ticketId
    })
    .expect(404);
});

it('return an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: 'sdfas',
    status: OrderStatus.Created,
    expiresAt: new Date()
  });
  await order.save();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ 
      ticketId : ticket.id
    })
    .expect(400);
    
}); 

it('reserves a ticket', async () => {

});

it('emits an order created event', async () => {

});

it('publishes a ticket updated event', async () => {

});