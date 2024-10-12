import React from "react";
import ProductCard from "./ProductCard";

export default function ProductLIst(
  { products } //: { products: any[] }
) {
  return (
    <div className=" p-8 flex flex-row items-center flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard
          id={product.id}
          key={product.id}
          image={`${"https://pub-700600023f6f48fb88997df52195b1be.r2.dev/"}${
            product?.product_image[0]?.image_url ||
            "images/1727145686989images.jpeg"
          }`}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}
