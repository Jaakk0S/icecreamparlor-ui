import type { ProductData } from "./ProductData";

export type OrderData = {
  id?: number;
  customerName?: string;
  products: ProductData[]
}

