
export type ProductData = {
  id?: number;
  name?: string;
  flavor?: {
    id?: number;
    name?: string;
  };
  cone?: {
    id?: number;
    name?: string;
  };
  toppings?: {
    id?: number;
    name?: string;
  }[]
}