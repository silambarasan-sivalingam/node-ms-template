export enum Subjects {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',

  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',

  ExpirationComplete = 'expiration:complete',
  PaymentCreated = 'payment:created',
  PaymentCancelled = 'payment:cancelled',
  PaymentRefunded = 'payment:refunded',
  PaymentFailed = 'payment:failed',
  PaymentSuccess = 'payment:success',
  
}
