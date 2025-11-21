import { Component } from '@angular/core';
import { UserLocalService } from '../../../../core/services/user_local_service/user-local.service';
import { LoginResponse } from '../../../../core/models/loginResponse';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user_data:LoginResponse | null = null;
  constructor(private user_local_service:UserLocalService){}

  ngOnInit(){
    this.user_data = this.user_local_service.get_user_local();
  }
}
