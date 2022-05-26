import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getErrorMsg } from "../../lib/error-helper.js";

const stripe = new Stripe(process.env.NEX_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: getErrorMsg(error) });
    }
  }
}
