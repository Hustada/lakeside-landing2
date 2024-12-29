import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import logger from '@/utils/logger';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  logger.info('Verifying booking session', { sessionId });

  if (!sessionId) {
    logger.warn('No session ID provided');
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    logger.debug('Retrieving Stripe session', { sessionId });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      logger.warn('Payment not completed', { 
        sessionId,
        paymentStatus: session.payment_status 
      });
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    logger.info('Booking verified successfully', {
      sessionId,
      amount: session.amount_total,
      startDate: session.metadata?.startDate,
      endDate: session.metadata?.endDate,
      nights: session.metadata?.nights,
    });

    return NextResponse.json({
      paid: true,
      amount: session.amount_total,
      startDate: session.metadata?.startDate,
      endDate: session.metadata?.endDate,
      nights: session.metadata?.nights,
    });
  } catch (err: any) {
    logger.error('Failed to verify booking', {
      sessionId,
      error: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { error: err.message || 'Failed to verify booking' },
      { status: 500 }
    );
  }
}
