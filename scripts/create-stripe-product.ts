import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

async function createProduct() {
  try {
    // Create the product
    const product = await stripe.products.create({
      name: 'Lakeside Landing Cabin',
      description: 'Nightly stay at our beautiful lakeside cabin',
      images: ['https://example.com/cabin-image.jpg'], // Replace with actual image URL
    });

    console.log('Product created:', product);

    // Create a price for the product (e.g., $200 per night)
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 20000, // Amount in cents ($200.00)
      currency: 'usd',
    });

    console.log('Price created:', price);
    console.log('\nAdd this price ID to your .env file:');
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_ID=${price.id}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

createProduct();
