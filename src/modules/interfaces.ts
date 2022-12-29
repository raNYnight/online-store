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

export interface Data {
    limit:number,
    products: Product[],
    skip: number,
    total: number
}

export interface FilteringObject  {
    name: string,
    brand:string[],
    category:string[],
    minStock:number | string,
    maxStock: number | string,
    minPrice: number | string,
    maxPrice:number | string
}