import { Product } from "./product";
import { Shop } from "./shop";

export interface ShopPagination{
    count:number,
    next:number | null,
    previous:number | null,
    results: Shop[]
}
export interface ProductPagination{
    count:number,
    next:string | null,
    previous:string | null,
    results: Product[]
}