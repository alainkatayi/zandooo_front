import { Component } from '@angular/core';
import { Shop } from '../../../core/models/shop';
import { Product } from '../../../core/models/product';
import { ShopService } from '../../../core/services/shop_service/shop.service';
import { ProductService } from '../../../core/services/product_service/product.service';
import { ProductCardComponent } from "../../components/client/product-card/product-card.component";
import { ShopCardComponent } from "../../components/client/shop-card/shop-card.component";
import { NavbarComponent } from "../../components/client/navbar/navbar.component";
import { FooterComponent } from "../../components/client/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent, ShopCardComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  shops!: Shop[]
  products!: Product[]
  page_size = 6
  current_page = 1
  next_page_url: string | null = null
  prev_page_url: string | null = null
  total_count = 0

  //pagination product
  page_size_product = 6
  current_page_product = 1
  next_page_url_product: string | null = null
  prev_page_url_product: string | null = null
  total_count_product = 0

  product_is_loading:Boolean = false
  shop_is_loading:Boolean = false
  constructor(private shopService: ShopService, private productService: ProductService) { }

  ngOnInit() {
    this.getAllShops()
    this.getAllProducts()
  }

  getAllShops(page: number = 1) {
    this.shop_is_loading = true
    this.current_page = page
    this.shopService.getAllShops(page, this.page_size).subscribe({
      next: (response) => {
        this.shop_is_loading = false
        console.log("RESPONSE", response)
        this.shops = response.results
        console.log(this.shops)
      },
      error: (error) => {
        this.shop_is_loading = false
        console.log("ERROR", error)
      }
    })
  }

  getAllProducts(page: number = 1) {
    this.product_is_loading = true
    this.current_page_product = page
    this.productService.getAllProducts(page, this.page_size).subscribe({
      next: (response) => {
        this.product_is_loading = false
        this.products = response.results
        this.total_count_product = response.count
        this.next_page_url_product = response.next
        this.prev_page_url_product = response.previous

        console.log(this.products)
      },

      error: (error) => {
        this.product_is_loading = false
        console.log(error)
      }
    })
  }
}
