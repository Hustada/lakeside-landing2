const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

async function listPrices() {
  try {
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
    });

    console.log('Available Prices:');
    prices.data.forEach(price => {
      console.log(`\nPrice ID: ${price.id}`);
      console.log(`Amount: ${price.unit_amount / 100} ${price.currency.toUpperCase()}`);
      console.log(`Product ID: ${price.product}`);
      console.log(`Active: ${price.active}`);
      console.log(`Created: ${new Date(price.created * 1000).toISOString()}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

listPrices();
