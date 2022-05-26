import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEX_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }

  return stripePromise;
};

export { getStripe };
