import { Injectable } from '@angular/core';
import { LoginResponse } from '../../models/loginResponse';
import { HttpHeaders } from '@angular/common/http';
const SESSION_KEY = 'userSession';
@Injectable({
  providedIn: 'root'
})
export class UserLocalService {

  constructor() { }

  store_user_local(data:LoginResponse){
    localStorage.setItem(SESSION_KEY,JSON.stringify(data))
  }

  get_user_local():LoginResponse | null {
    if(typeof localStorage === 'undefined'){
      return null
    }
    const data_user = localStorage.getItem(SESSION_KEY)
    return data_user ? JSON.parse(data_user) as LoginResponse : null
  }

  getAuthHeaders():HttpHeaders{
    const user = this.get_user_local()

    return new HttpHeaders({
      Accept :'application/json',
      Authorization : `Bearer ${user?.access}`
    })
  }
}
