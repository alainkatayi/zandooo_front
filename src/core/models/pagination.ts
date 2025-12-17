import { Shop } from "./shop";

export interface ShopPagination{
    count:number,
    next:number | null,
    previous:number | null,
    results: Shop[]
}