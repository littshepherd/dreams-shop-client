<<<<<<< HEAD
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
=======
import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
>>>>>>> dev
import { usePathname } from "next/navigation";
export default function ProductCard(
  { id, image, name, price } //: { image: any }
) {
<<<<<<< HEAD
  const pathname = usePathname();
  const [imageData, setImageData] = useState("");

=======
  const [imageData, setImageData] = useState("");
  const pathname = usePathname();
>>>>>>> dev
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
<<<<<<< HEAD
    <div className="w-80 bg-slate-700  rounded-md">
      <div className="w-full h-80 p-2 ">
        <Image
          src={imageData}
          alt="product"
          width={200}
          height={200}
          className=" object-cover h-full w-full  rounded-t-md"
=======
    <div className="w-80 bg-gray-600 rounded-md">
      <div className="w-full">
        <Image
          src={imageData}
          alt="product"
          width={100}
          height={100}
          className="w-full"
>>>>>>> dev
        />
      </div>
      <div className="text-white p-4">
        <p>{name}</p>
        <p>Price: {price}</p>
      </div>
<<<<<<< HEAD
      <Link
        href={`${pathname}/${id}`}
        className="flex justify-center items-center h-12 w-full  bg-fuchsia-950 rounded-none rounded-b-md text-white"
      >
        Ver Producto
      </Link>
=======
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
>>>>>>> dev
    </div>
  );
}
