import { Product } from "./interfaces";

export async function fetchJSON(url: string): Promise<Product[]> {
  let obj;
  const res = await fetch(url)
  obj = await res.json();
  return obj.products;
}