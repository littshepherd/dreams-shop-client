import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductCard(
  { image, name, price } //: { image: any }
) {
  const [imageData, setImageData] = useState("");

  const setImage = async (image) => {
    if (image) {
      const response = await fetch(`${image}`);

      const data = await response.blob();
      const url = URL.createObjectURL(data);
      setImageData(url);
    }
  };

  useEffect(() => {
    setImage(image);
  }, [image]);
  return (
    <div className="w-80 bg-gray-600 rounded-md">
      <div className="w-full">
        <Image
          src={imageData}
          alt="product"
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div className="text-white p-4">
        <p>{name}</p>
        <p>Price: {price}</p>
      </div>
      <Button
        sx={{
          textColor: "white",
          color: "white",
          paddingLeft: 0,
          backgroundColor: "purple",
          width: "100%",
          height: "3rem",
        }}
      >
        Ver Producto
      </Button>
    </div>
  );
}
