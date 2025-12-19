import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '../../models/shop';
import { ShopPagination } from '../../models/pagination';
import { UserLocalService } from '../user_local_service/user-local.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = environment.url
  constructor(private http : HttpClient, private userLocalService:UserLocalService) { }

  getAllShops(page:number = 1, page_size = 6):Observable<ShopPagination>{
    let params = new HttpParams()
      .set('page',page.toString())
      .set('page_size',page_size.toString())
    return this.http.get<ShopPagination>(`${this.apiUrl}shops/index/`, {params})
  }

  createShop(data:FormData):Observable<Shop>{
    const headers = this.userLocalService.getAuthHeaders()
    return this.http.post<Shop>(this.apiUrl +'shops/store/', data,{headers})
  }
}
