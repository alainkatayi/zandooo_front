import { Shop } from "./shop";

export interface Product{
    name:string,
    description:string,
    price:number,
    image:string,
    stock:number,
    shop:Shop
}