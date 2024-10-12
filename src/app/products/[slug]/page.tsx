"use client";
// import { usePathname } from "next/navigation";
import { getProducts } from "@/app/products/actions";
import { useEffect, useState } from "react";
import ProductLIst from "../(components)/ProductLIst";

export default function Page() {
  // const pathname = usePathname();
  // const category = pathname.split("/")[2];

  const [productLIst, setProductList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getProducts();
      setProductList(response);
    };
    fetch();
  }, []);

  console.log(productLIst);
  return (
    <div>
      <h1>Products</h1>
      <ProductLIst products={productLIst} />;
    </div>
  );
}
