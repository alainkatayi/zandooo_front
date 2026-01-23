import { Shop } from './../../../../core/models/shop';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/client/navbar/navbar.component";
import { FooterComponent } from "../../../components/client/footer/footer.component";
import { LoginResponse } from '../../../../core/models/loginResponse';
import { NgIf } from '@angular/common';
import { ShopService } from '../../../../core/services/shop_service/shop.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../env/env';



@Component({
  selector: 'app-overview',
  imports: [NavbarComponent, FooterComponent, NgIf],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  user: LoginResponse | null = null
  myShop:Shop | null = null
  has_shop:boolean = false
  url = environment.url
  constructor(private shopService:ShopService){}
  ngOnInit(){
    this.getShopByOwner()
  }

  getShopByOwner(){
    this.shopService.getShopByOwner().subscribe({
      next:(response:Shop) => {
        this.myShop = response
        console.log("ee",response)
        this.has_shop = true
      },

      error:(error:HttpErrorResponse)=>{
        console.log(error)
        this.has_shop = false
      }
    })
  }
}
