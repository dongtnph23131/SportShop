export interface Product {
  id: string;
  name: string;
  description: string;
  images: Image[];
  categoryId: string;
  options: Option[];
  maxPrice: number;
  minPrice: number;
  category: Category;
  variants: Variant[];
}

export interface Variant {
  name: string;
  price: number;
  inventory: number;
  options: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Option {
  name: string;
  values: string[];
  id: string;
}

export interface Image {
  name: string;
  url: string;
  publicId: string;
  id: string;
}
