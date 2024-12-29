import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import logger from '@/utils/logger';

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID) {
    logger.error('Stripe price ID not configured');
    return NextResponse.json(
      { error: { message: 'Stripe price ID is not configured' } },
      { status: 500 }
    );
  }

  try {
    const { startDate, endDate } = await req.json();
    logger.info('Received booking request', { startDate, endDate });

    // Calculate number of nights
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    logger.debug('Calculated stay duration', { nights });

    if (nights < 1) {
      logger.warn('Invalid date range provided', { startDate, endDate, nights });
      return NextResponse.json(
        { error: { message: 'Invalid date range' } },
        { status: 400 }
      );
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    logger.debug('Creating Stripe session', { 
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      nights,
      origin 
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: nights,
          adjustable_quantity: {
            enabled: false,
          },
        },
      ],
      mode: 'payment',
      success_url: `${origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      metadata: {
        startDate,
        endDate,
        nights: nights.toString(),
      },
    });

    logger.info('Stripe session created', { 
      sessionId: session.id,
      amount: session.amount_total 
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    logger.error('Failed to create checkout session', {
      error: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { error: { message: err.message || 'Failed to create checkout session' } },
      { status: 500 }
    );
  }
}
