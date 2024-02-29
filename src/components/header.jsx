import React from "react";

const Header = ({ numberOfProducts }) => {
  return (
    <header className="container header-container">
      <h1 className="page-title">Список товаров</h1>
      <div className="header-controls">
        <button className="filter-button">Фильтрация</button>
        {numberOfProducts ? (
          <span className="product-count">Товаров: {numberOfProducts}</span>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
