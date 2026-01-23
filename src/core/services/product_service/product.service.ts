import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';
import { HttpClient } from '@angular/common/http';
import { UserLocalService } from '../user_local_service/user-local.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Shop } from '../../models/shop';

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
}
