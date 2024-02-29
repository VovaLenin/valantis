import React, { useState, useEffect } from "react";
import getXAuth from "./app/utils/tokenGenerator";
import fetchAllIds from "./app/utils/fetchAllIds";
import fetchProducts from "./app/utils/fetchProducts";
import ProductsList from "./components/productsList";
import Pagination from "./components/pagination";
import Header from "./components/header";

const API_BASE_URL = "https://api.valantis.store:41000/";
const PASSWORD = "Valantis";
const ITEMS_PER_PAGE = 50;

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allProductsId, setAllProductsId] = useState([]);

  const xAuth = getXAuth(PASSWORD);

  useEffect(() => {
    setLoading(true);
    fetchAllIds(xAuth, API_BASE_URL)
      .then((ids) => {
        setAllProductsId(ids);
        setLoading(false);
        console.log("id loading");
      })
      .catch((error) => {
        console.error("Error fetching product IDs:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allProductsId.length === 0) {
      return; // Если ID еще не получены, ничего не делаем
    }
    fetchProducts(
      xAuth,
      API_BASE_URL,
      allProductsId,
      page,
      setProducts,
      setLoading,
      ITEMS_PER_PAGE
    );
  }, [allProductsId, page]);

  const totalPageCount = Math.ceil(allProductsId.length / ITEMS_PER_PAGE);

  // Функция для обработки изменения страницы
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Header numberOfProducts={allProductsId.length} />
      <ProductsList products={products} loading={loading} />
      <Pagination
        totalPageCount={totalPageCount}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default App;
