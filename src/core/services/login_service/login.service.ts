import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';
import { LoginData } from '../../models/loginData';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiurl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  login(data:LoginData):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiurl}token/`,data);
  }
}
