import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@silambarasansivalingam/common';
import { Ticket } from '../../models/Ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName ;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    
  }
}

