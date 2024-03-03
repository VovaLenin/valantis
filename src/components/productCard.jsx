import React from "react";
const ProductCard = ({ product }) => {
  return (
    <article key={product.id} className="card">
      <div className="card-container">
        <div className="card-header">
          <h5 className="card-title"> {product.product}</h5>
          {product.brand ? <p className="card-brand">{product.brand}</p> : null}
        </div>
        <div className="card-footer">
          <p className="card-id">ID: {product.id}</p>
          <p className="card-price">{product.price}₽</p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
