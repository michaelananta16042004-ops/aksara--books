const API_URL = "http://localhost:3001/api/v1";

export const getBooks = async (category = "semua") => {
  try {
    const res = await fetch(`${API_URL}/books${category !== "semua" ? `?category_id=${category}` : ""}`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBook = async (id) => {
  try {
    const res = await fetch(`${API_URL}/books/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Auth
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
};

export const register = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ auth: { name, email, password } }),
  });
  return await res.json();
};

// Cart
export const getCart = async (token) => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const addToCart = async (token, bookId, quantity = 1) => {
  const res = await fetch(`${API_URL}/cart/items`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ book_id: bookId, quantity }),
  });
  return await res.json();
};
