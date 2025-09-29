export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  thumbnail: string;
  sizes: string[];
  description: string;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/products.json', { cache: 'no-store' });
  return await res.json();
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  const products = await fetchProducts();
  return products.find(p => p.id === id);
}
