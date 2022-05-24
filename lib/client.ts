import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
  projectId: "c5husf9b",
  dataset: "production",
  apiVersion: "2022-05-19",
  useCdn: true,
  token: process.env.NEX_PUBLIC_SANITY_TOKEN,
});

export const builder = ImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) =>
  builder.image(source) as unknown as string;
