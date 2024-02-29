import React from "react";
import ProductCard from "./productCard";

const ProductsList = ({ products, loading }) => {
  return (
    <>
      {loading ? (
        <p className="loading-indicator">Loading...</p>
      ) : (
        <main className="container grid-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
      )}
    </>
  );
};

export default ProductsList;
