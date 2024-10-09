import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/Order';
import { Ticket } from '../../models/Ticket';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '../../models/Ticket';


const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();
    return ticket;
}

it('fetches orders for a particular user', async () => {    

    // Create three tickets
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const userOne = global.signin();
    const userTwo = global.signin();

    // Create one order as User #1


    // Create two orders as User #2


    // Make request to get orders for User #2


    // Make sure we only got the orders for User #2


});