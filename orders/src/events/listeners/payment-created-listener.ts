import { Subjects, Listener, PaymentCreatedEvent } from  '@silambarasansivalingam/common';
import { Message } from 'node-nats-streaming';


export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = 'payments-service';

  onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    console.log('PaymentCreatedEvent received', data);

    msg.ack();
  }
}