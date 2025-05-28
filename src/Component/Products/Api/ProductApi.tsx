// src/api/productApi.ts

export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

const API_URL =
  "https://6836f14b664e72d28e42ccbb.mockapi.io/Ecom/tanstack/product";

// Fetch all products
export const getAllProducts = async (): Promise<ProductType[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<ProductType> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return await response.json();
};

// Add a new product
export const addProduct = async (
  product: Omit<ProductType, "id">
): Promise<ProductType> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to add product");
  return await response.json();
};

// Update a product
export const updateProduct = async (id: string, productData: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
};
