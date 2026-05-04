import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserLocalService } from '../user_local_service/user-local.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Shop } from '../../models/shop';
import { ProductPagination } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.url
  constructor(private http:HttpClient,private userLocalService:UserLocalService) { }


  createProduct(data:FormData):Observable<Product>{
    const headers = this.userLocalService.getAuthHeaders()
    return this.http.post<Product>(this.apiUrl +'products/store/', data, {headers})
  }

  getProductByShop(page:number = 1, page_size = 6):Observable<Product[]>{
    const headers = this.userLocalService.getAuthHeaders()

    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', page_size.toString())

    return this.http.get<Product[]>(`${this.apiUrl}products/my-product/`, {params, headers})

  }
  getAllProducts(page:number = 1, page_size = 6):Observable<ProductPagination>{
    const headers = this.userLocalService.getAuthHeaders()

    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', page_size.toString())

    return this.http.get<ProductPagination>(`${this.apiUrl}products/index/`, {params, headers})

  }

  deleteProduct(id:number){
    const headers = this.userLocalService.getAuthHeaders()
    return this.http.delete(this.apiUrl + 'products/' + id + '/delete/', {headers})

  }
}
