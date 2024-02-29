export default async function fetchAllIds(
  xAuth,
  API_BASE_URL,
  maxRetries = 3,
  currentRetry = 0
) {
  const requestData = {
    action: "get_ids",
    params: { offset: 0, limit: 10000 }, // Запрашиваем все идентификаторы
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "X-Auth": xAuth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };

  try {
    const response = await fetch(`${API_BASE_URL}`, requestOptions);
    const data = await response.json();
    return [...new Set(data.result)]; // Сохраняем уникальные идентификаторы
  } catch (error) {
    console.error("Error fetching product IDs:", error);
    if (currentRetry < maxRetries) {
      // Повторяем запрос, увеличивая счетчик попыток
      return fetchAllIds(xAuth, API_BASE_URL, maxRetries, currentRetry + 1);
    } else {
      // Достигнуто максимальное количество попыток, возвращаем ошибку
      throw new Error("Max retries exceeded");
    }
  }
}
