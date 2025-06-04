export interface User {
  email: string;
}

export interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: "none" | "name-asc" | "name-desc" | "price-asc" | "price-desc";
  onSortChange: (value: "none" | "name-asc" | "name-desc" | "price-asc" | "price-desc") => void;
  onAddProductClick: () => void;
}

export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}
