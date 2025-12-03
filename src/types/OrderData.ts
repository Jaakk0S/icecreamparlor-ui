import type { ProductData } from "./ProductData";

export enum OrderStatus   {
  UnderConstruction, Placed, InPreparation, InDelivery, Delivered
}

export type OrderData = {
  id?: number;
  status:
  customerName?: string;
  products: ProductData[]
}

