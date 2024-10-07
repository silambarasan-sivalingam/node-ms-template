import { Publisher, Subjects, TicketCreatedEvent } from '@silambarasansivalingam/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
