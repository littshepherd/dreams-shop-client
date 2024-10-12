"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ACCOUNT_ID: string =
  process.env.R2_ACCOUNT_ID || "68b16c326a459efc49c27bdd5d726b1f";
const ACCESS_KEY_ID: string =
  process.env.R2_ACCESS_KEY_ID || "7fffd577a4cbdbfeb9510c815c732266";
const SECRET_ACCESS_KEY: string =
  process.env.R2_SECRET_ACCESS_KEY ||
  "8a7c7c7011e1dbfce27d641fcfde1bc846df7aea1f799f750f508dad4f1704a5";
const BUCKET_NAME: string = process.env.R2_BUCKET_NAME || "dreams-shop-images";

const s3Client = new S3Client({
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: "auto", // Cloudflare R2 doesn't use regions, but this is required by the SDK
});

export const uploadImage = async (data) => {
  const images = data.getAll("images");
  const imagesUPloadPomises = images.map(async (image: File) => {
    try {
      const binary = await image.arrayBuffer();
      const imageBuffer = Buffer.from(binary);
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `images/${image.name}`,
        Body: imageBuffer, // Conversión a buffer (asegúrate de que venga bien codificado)
      });

      const responseR2 = await s3Client.send(command);
      return responseR2;
    } catch (error) {
      console.log(error);
    }
  });

  const response = await Promise.all(imagesUPloadPomises);
  console.log(response);
  return response;
};

export const getCategories = async () => {
  const response = await fetch(`${process.env.BACKEND_API_URL}/categories`);
  const data = await response.json();
  return data;
};

export const saveProductFetch = async (data) => {
  console.log(data.name);
  const response = await axios.post(
    `${process.env.BACKEND_API_URL}/products`,
    {
      name: data.name,
      materials: data.materials,
      description: data.description,
      price: data.price,
      category_id: data.category,
      images: data.images,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response.data;
};
