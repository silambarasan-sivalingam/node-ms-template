import { Publisher, Subjects, TicketUpdatedEvent } from '@silambarasansivalingam/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
