import type { ProductData } from "./ProductData";

const OrderStatus = {
  UnderConstruction: 'UnderConstruction',
  Placed: 'Placed',
  InPreparation: 'InPreparation',
  InDelivery: 'InDelivery',
  Delivered: 'Delivered'
}
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export type OrderData = {
  id?: number;
  status?: OrderStatus,
  customerName?: string,
  products: ProductData[]
}

