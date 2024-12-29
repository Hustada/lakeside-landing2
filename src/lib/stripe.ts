import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// This is for the server-side Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Use the latest API version
});

// This is for the client-side Stripe instance
const getStripe = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  return stripePromise;
};

export { stripe, getStripe };
