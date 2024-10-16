import { OrderCreatedEvent, OrderStatus } from "@silambarasansivalingam/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import { Ticket } from "../../../models/Ticket";


const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);


    //Create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'asdf'
    });
    await ticket.save();

    // Create a fake data event
    const data: OrderCreatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version,
        status: OrderStatus.Created,
        userId: 'alskdfj',
        expiresAt: 'alskdjf',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };


    // @ts-ignore
    const msg = {
        ack: jest.fn()
    };

    return { listener, ticket, data, msg };

};


it('sets the orderId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

     // @ts-ignore
    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);

});

it('acks the message', async () => {
    const { listener, ticket, data, msg } = await setup();

     // @ts-ignore
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

});

it('publishes a ticket updated event', async () => {
    const { listener, ticket, data, msg } = await setup();

     // @ts-ignore
    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(data.id).toEqual(ticketUpdatedData.orderId);

});


