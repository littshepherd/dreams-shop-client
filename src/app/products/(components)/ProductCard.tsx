import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ProductCard(
  { id, image, name, price } //: { image: any }
) {
  const [imageData, setImageData] = useState("");
  const pathname = usePathname();
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
          padding: 0,
          backgroundColor: "purple",
          width: "100%",
          height: "3rem",
        }}
      >
        <Link
          className="inline-block align-end  h-full w-full "
          href={`${pathname}/${id}`}
        >
          Ver Producto
        </Link>
      </Button>
    </div>
  );
}
