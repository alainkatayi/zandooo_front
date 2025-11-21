import { Injectable } from '@angular/core';
import { LoginResponse } from '../../models/loginResponse';
const SESSION_KEY = 'userSession';
@Injectable({
  providedIn: 'root'
})
export class UserLocalService {

  constructor() { }

  store_user_local(data:LoginResponse){
    localStorage.setItem(SESSION_KEY,JSON.stringify(data))
  }
}
