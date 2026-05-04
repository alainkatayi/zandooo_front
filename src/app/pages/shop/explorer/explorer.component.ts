import { ProductService } from './../../../../core/services/product_service/product.service';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/client/navbar/navbar.component";
import { ProductCardComponent } from "../../../components/client/product-card/product-card.component";
import { FooterComponent } from "../../../components/client/footer/footer.component";
import { Shop } from '../../../../core/models/shop';
import { ShopService } from '../../../../core/services/shop_service/shop.service';
import { ShopCardComponent } from "../../../components/client/shop-card/shop-card.component";
import { Product } from '../../../../core/models/product';
import { ShopCardRectangleComponent } from "../../../components/client/shop-card-rectangle/shop-card-rectangle.component";

@Component({
  selector: 'app-explorer',
  imports: [NavbarComponent, FooterComponent, ShopCardRectangleComponent],
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.css'
})
export class ExplorerComponent {
  shops!:Shop[]
  products!: Product[]
  page_size = 10
  current_page = 1
  next_page_url : string | null = null
  prev_page_url : string | null = null
  total_count = 0

  //pagination product
  page_size_product = 6
  current_page_product = 1
  next_page_url_product : string | null = null
  prev_page_url_product : string | null = null
  total_count_product = 0
  constructor(private shopService:ShopService, private productService: ProductService){}

  ngOnInit(){
    this.getAllShops()
    this.getAllProducts()
  }

  getAllShops(page: number = 1){
    this.current_page = page
    this.shopService.getAllShops(page, this.page_size).subscribe({
      next:(response)=>{
        console.log("RESPONSE",response)
        this.shops = response.results
        console.log(this.shops)
      },
      error:(error)=>{
        console.log("ERROR",error)
      }
    })
  }

  getAllProducts(page:number=1){
    this.current_page_product = page
    this.productService.getAllProducts(page, this.page_size).subscribe({
      next:(response)=>{
        this.products = response.results
        this.total_count_product = response.count
        this.next_page_url_product = response.next
        this.prev_page_url_product = response.previous

        console.log(this.products)
      },

      error:(error)=>{
        console.log(error)
      }
    })
  }
}
