import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

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

}); 

it('reserves a ticket', async () => {

});

it('emits an order created event', async () => {

});

it('publishes a ticket updated event', async () => {

});