"use client";
import React, { useEffect, useState } from "react";
import { getProductById } from "../../actions";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@mui/material";
// const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL =
  process.env.R2_PUBLIC_URL ||
  "https://pub-700600023f6f48fb88997df52195b1be.r2.dev";
export default function Page() {
  const id = parseInt(usePathname().split("/")[3]);
  const [product, setProduct] = useState(null);
  const [imagesData, setImagesData] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const urlPromises = (images) => {
    console.log(images);
    const urls = images.map(async (image) => {
      const response = await fetch(`${R2_PUBLIC_URL}/${image.image_url}`);
      console.log(`${R2_PUBLIC_URL}/${image.image_url}`);
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      return url;
    });
    return Promise.all(urls);
  };
  const setImages = async (images) => {
    if (images) {
      setImagesData(await urlPromises(images));
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await getProductById(id);
      setProduct(response);
      await setImages(response.product_image);
    };
    fetch();
  }, []);
  console.log(imagesData);
  return (
    <div>
      <div className="flex h-[23rem] w-[23rem] ">
        <Button onClick={() => setCurrentImage((prev) => prev - 1)}>
          Back
        </Button>
        {imagesData.length > 0 && (
          <Image
            className="w-full "
            src={imagesData[currentImage]}
            width={100}
            height={100}
            alt="product"
            key={imagesData[0]}
          />
        )}
        <Button onClick={() => setCurrentImage((prev) => prev + 1)}>
          next
        </Button>
      </div>
      <h1>{product?.name}</h1>
      <p>{product?.price}</p>
      <p>{product?.description}</p>
      <p>{product?.materials}</p>
      {/* <img src={product?.product_image[0]?.image_url} alt="product" /> */}
    </div>
  );
}
