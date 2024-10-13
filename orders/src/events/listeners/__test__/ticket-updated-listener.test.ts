import { Listener, TicketUpdatedEvent } from '@silambarasansivalingam/common';
import { TicketUpdatedListener } from './../ticket-updated-listener';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/Ticket';

const setup = async () => {
    // Create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    });
    await ticket.save();


    // Create a fake data event
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'ablskdjf',
    };

    // Create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };


    // Return all of this stuff
    return { msg, data, ticket, listener };
};


it('creates and saves a ticket', async () => {
    // Call the onMessage function with the data object + message object
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);

    // Write assertions to make sure a ticket was created
});


it('acks the message', async () => {
    // Call the onMessage function with the data object + message object
    const { msg, data, listener } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();


    // Write assertions to make sure ack function is called
});


it('does not call ack if the event has a skipped version number', async () => {
    // Create a listener
    const { listener, data, msg } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {

    }

    expect(msg.ack).not.toHaveBeenCalled();
});


it('publishes an event', async () => {
    // Create an instance of the listener
});