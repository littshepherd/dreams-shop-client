import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function ProductCard(
  { id, image, name, price } //: { image: any }
) {
  const pathname = usePathname();
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
    <div className="w-80 bg-slate-700  rounded-md">
      <div className="w-full h-80 p-2 ">
        <Image
          src={imageData}
          alt="product"
          width={200}
          height={200}
          className=" object-cover h-full w-full  rounded-t-md"
        />
      </div>
      <div className="text-white p-4">
        <p>{name}</p>
        <p>Price: {price}</p>
      </div>
      <Link
        href={`${pathname}/${id}`}
        className="flex justify-center items-center h-12 w-full  bg-fuchsia-950 rounded-none rounded-b-md text-white"
      >
        Ver Producto
      </Link>
    </div>
  );
}
