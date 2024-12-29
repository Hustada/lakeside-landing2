import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = async () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error('Stripe publishable key is not set');
    }
    stripePromise = loadStripe(key);
  }
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Failed to initialize Stripe');
  }
  return stripe;
};
