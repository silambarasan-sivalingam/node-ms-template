import Stripe from 'stripe';

if (!process.env.STRIPE_KEY) {
    throw new Error('Stripe Secret Key is missing from environment variables');
  }
  
export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2024-09-30.acacia'
});
