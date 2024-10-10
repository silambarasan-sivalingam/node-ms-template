import { Publisher, OrderCreatedEvent, Subjects } from '@silambarasansivalingam/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
