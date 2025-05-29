export interface User {
  email: string;
}

export interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onAddProductClick: () => void;
}

export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}
