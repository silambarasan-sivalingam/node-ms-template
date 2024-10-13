
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledEvent } from "@silambarasansivalingam/common";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Ticket } from "../../../models/Ticket";
import mongoose from "mongoose";


const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();

    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'asdf',
    })

    ticket.set({ orderId });
    await ticket.save();

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { msg, data, ticket, orderId, listener }

};



it('updates the ticket, publishes an event, and acks the message', async () => {
    const { msg, data, ticket, orderId, listener } = await setup();
    await listener.onMessage(data, msg);
    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});


it('acks the message', async () => {
    const { msg, data, ticket, orderId, listener } = await setup();

    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const { msg, data, ticket, orderId, listener } = await setup();

    await listener.onMessage(data, msg);
    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    expect(ticketUpdatedData.orderId).not.toBeDefined();
});

