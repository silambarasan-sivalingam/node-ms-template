import { Subjects } from './subjects';
export interface paymentCreatedEvent {
    subject: Subjects.PaymentCreated;
    data: {
        id: string;
        orderId: string;
        stripeId: string;
    };
}
