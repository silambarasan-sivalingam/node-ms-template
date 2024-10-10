import { Publisher, OrderCancelledEvent, Subjects } from '@silambarasansivalingam/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}