const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

export const fetchData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  return await response.json();
};

