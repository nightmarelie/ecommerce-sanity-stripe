import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getErrorMsg } from "../../lib/error-helper.js";

const stripe = new Stripe(
  process.env.NEX_PUBLIC_STRIPE_SECRET_KEY!,
  {} as Stripe.StripeConfig
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "{{PRICE_ID}}",
            quantity: 1,
          },
        ],
        shipping_rates: [
          "shr_1L3nNkAK6DJMlm2p77gP9kcV",
          "shr_1L3nPvAK6DJMlm2pipkrGMtf",
        ],
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url!);
    } catch (err) {
      res.status(500).json(getErrorMsg(err));
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
