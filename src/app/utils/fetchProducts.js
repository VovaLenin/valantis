export default async function fetchProducts(
  xAuth,
  API_BASE_URL,
  allProductsId,
  page,
  setProducts,
  setLoading,
  ITEMS_PER_PAGE
) {
  setLoading(true);
  try {
    // Получаем идентификаторы для текущей страницы
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageIds = allProductsId.slice(startIndex, endIndex);

    // Запрашиваем товары для текущей страницы
    const requestData = {
      action: "get_items",
      params: { ids: currentPageIds },
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "X-Auth": xAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
    const productsData = await fetch(`${API_BASE_URL}`, requestOptions);
    const productsJson = await productsData.json();

    // Обработка ошибок сервера
    if (!productsData.ok) {
      throw new Error("Failed to fetch products");
    }

    // Фильтрация уникальных товаров по id
    const uniqueProducts = productsJson.result.reduce((acc, product) => {
      // Проверяем, есть ли уже в массиве товар с таким же id
      const existingProductIndex = acc.findIndex((p) => p.id === product.id);
      // Если товар с таким id уже есть в массиве, пропускаем его
      if (existingProductIndex !== -1) {
        return acc;
      }
      // Иначе добавляем товар в массив
      return [...acc, product];
    }, []);
    setProducts(uniqueProducts);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching products:", error);
    setLoading(false);
  }
}
