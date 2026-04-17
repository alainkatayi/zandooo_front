import { CommonModule, NgIf } from '@angular/common';
import { ProductService } from '../../../../core/services/product_service/product.service';
import { environment } from '../../../../env/env';
import { Product } from './../../../../core/models/product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-management',
  imports: [CommonModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  products!:Product[]
  url = environment.url
  page_size = 6
  current_page = 1
  next_page_url : string | null = null
  prev_page_url : string | null = null
  total_count = 0
  productId:number = -1
  DeleteModalOpen:boolean = false
  constructor(private productService:ProductService){}

  ngOnInit(){
    this.getProductByStore()
  }


  getProductByStore(page:number = 1){
    this.current_page = page
    this.productService.getProductByShop(page, this.page_size).subscribe({
      next:(response)=>{
        this.products = response
        console.log("produit",this.products)
        console.log("RESPONSE",response)
      },
      error:(error) =>{
        console.log("ERROR", error)
      }
    })
  }

  deleteProduct(){
    this.productService.deleteProduct(this.productId).subscribe({
      next:(response)=>{
         window.location.reload()
         console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  openDeleteModal(id:number){
    this.DeleteModalOpen = true
    this.productId = id
  }

  confirmDelete(){
    this.deleteProduct()
    this.closeDeleteModal()
  }

  closeDeleteModal(){
    this.DeleteModalOpen = false
  }
}
