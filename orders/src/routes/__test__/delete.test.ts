import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/Order';
import { Ticket } from '../../models/Ticket';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '../../models/Ticket';
import mongoose from 'mongoose';

it('marks an order as cancelled', async () => {
// create a ticket with ticket model
const ticket = Ticket.build({
  title: 'concert',
  price: 20,
  id: new mongoose.Types.ObjectId().toHexString(),
});

await ticket.save();

const user = global.signin();

// make a request to create an order
const {body: order} = await request(app)
  .post('/api/orders')
  .set('Cookie', user)
  .send({ ticketId: ticket.id })
  .expect(201);


// make a request to cancel the order
await request(app)
  .delete(`/api/orders/${order.id}`)
  .set('Cookie', user)
  .send()
  .expect(204);


// expectation to make sure the thing is cancelled
const updatedOrder = await Order.findById(order.id);

expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits a order cancelled event', async () => { 

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  
  await ticket.save();
  
  const user = global.signin();
  
  // make a request to create an order
  const {body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  
  
  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  
});  