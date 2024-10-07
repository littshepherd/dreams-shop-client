"use server";
import axios from "axios";
// import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3000";

interface IProductResponse {
  product_image: {
    image_url: string;
  }[];
}

// const ACCOUNT_ID: string =
//   process.env.R2_ACCOUNT_ID || "68b16c326a459efc49c27bdd5d726b1f";
// const ACCESS_KEY_ID: string =
//   process.env.R2_ACCESS_KEY_ID || "7fffd577a4cbdbfeb9510c815c732266";
// const SECRET_ACCESS_KEY: string =
//   process.env.R2_SECRET_ACCESS_KEY ||
//   "8a7c7c7011e1dbfce27d641fcfde1bc846df7aea1f799f750f508dad4f1704a5";
// const BUCKET_NAME: string = process.env.R2_BUCKET_NAME || "dreams-shop-images";

// const s3Client = new S3Client({
//   endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
//   credentials: {
//     accessKeyId: ACCESS_KEY_ID,
//     secretAccessKey: SECRET_ACCESS_KEY,
//   },
//   region: "auto", // Cloudflare R2 doesn't use regions, but this is required by the SDK
// });

export async function getCategories() {}

// async function getImages(images: IProductResponse["product_image"]) {
//   const imagesPromises = images?.map(async (image) => {
//     if (image.image_url) {
//       const command = new GetObjectCommand({
//         Bucket: BUCKET_NAME,
//         Key: image.image_url,
//       });

//       const s3Response = await s3Client.send(command);
//       return s3Response;
//     }
//     return false;
//   });
//   const imagesData = await Promise.all(imagesPromises);
//   return imagesData;
// }

export async function getProducts() {
  const response = await axios.get(`${BACKEND_API_URL}/products`);

  const { data } = response;

  return data;
}
