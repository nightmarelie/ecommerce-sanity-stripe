import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getErrorMsg } from "../../lib/error-helper";

const stripe = new Stripe(
  process.env.NEX_PUBLIC_STRIPE_SECRET_KEY!,
  {} as Stripe.StripeConfig
);

type Item = {
  _id: string;
  image: any[];
  name: "string";
  slug: { current: "string" };
  price: number;
  details: string;
  quantity: number;
};

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
        line_items: req.body.cartItemsmap((item: Item) => {
          const newImg = item.image[0].asset._ref
            .replace(
              "image-",
              `https://cdn.sanity.io/images/c5husf9b/production`
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImg],
              },
              price_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        shipping_rates: [
          "shr_1L3nNkAK6DJMlm2p77gP9kcV",
          "shr_1L3nPvAK6DJMlm2pipkrGMtf",
        ],
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(getErrorMsg(err));
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
