import { Listener } from '@silambarasansivalingam/common';
import { TicketUpdatedListener } from './../ticket-updated-listener';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/Ticket';

const setup = async () => {
    // Create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket

    // Create a fake data event

    // Create a fake message object

    // Return all of this stuff

};


it('creates and saves a ticket', async () => {
    // Call the onMessage function with the data object + message object

    // Write assertions to make sure a ticket was created
});

it('acks the message', async () => {
    // Call the onMessage function with the data object + message object

    // Write assertions to make sure ack function is called
});

it('publishes an event', async () => {
    // Create an instance of the listener
});