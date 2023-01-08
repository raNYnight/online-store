export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface FilteringObject {
  name: string,
  brand: string[],
  category: string[],
  minStock: number,
  maxStock: number,
  minPrice: number,
  maxPrice: number,
  sort: string,
}

export interface Fill {
  [key: string]: string
}
export interface CartItem {
  id: number,
  price: number,
  count: number,
}

export interface MyJsonProps {
  categories: string[],
  brands: string[],
  prices: {
    min: number,
    max: number,
  },
  stocks: {
    min: number,
    max: number,
  }
} 

export interface Promocode {
  name: string,
  desc: string,
  disc: number;
}