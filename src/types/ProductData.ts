export type AbstractProductData = {
  id?: number;
  name?: string;
}

export type FlavorData = AbstractProductData;
export type ConeData = AbstractProductData;
export type ToppingData = AbstractProductData;

export type ProductData = AbstractProductData & {
  flavor?: FlavorData;
  cone?: ConeData;
  toppings?: ToppingData[]
}