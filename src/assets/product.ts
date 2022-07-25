import { Discount } from "./discount";

export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    discount: Discount,
    image: string,
    quantity: number;
    subtotal: number;
}