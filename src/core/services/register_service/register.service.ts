import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';
import { HttpClient } from '@angular/common/http';
import { Register_User_Data } from '../../models/registerData';
import { Observable } from 'rxjs';
import { Register_User_Response } from '../../models/registerResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.url;
  constructor(private httpClient: HttpClient) { }

  register(data:Register_User_Data):Observable<Register_User_Response>{
    return this.httpClient.post<Register_User_Response>(`${this.apiUrl}/accounts/register/`,data);
  }
}
