import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/client/navbar/navbar.component";
import { ProductService } from '../../../../core/services/product_service/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [NavbarComponent,ReactiveFormsModule,NgIf,NgClass],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private productSerice:ProductService, private fb:FormBuilder){}

  productCreateForm!:FormGroup
  imageFile!:File | null 
  imagePreview:string | ArrayBuffer | null = null
  showToast:Boolean = false
  toastType: 'success' | 'error'= 'success'
  toastMessage: string = ''
  errorMessage: string = ''
  successMessage: string = ''
  isSubmited:Boolean = false


  ngOnInit(){
    this.productCreateForm = this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      price:[null,[Validators.required,Validators.min(0)]],
      stock:[null,[Validators.required, Validators.min(0)]],
      image:[null, [Validators.required]]
    })
  }

  onFileSelected(event:Event){
    const input = event.target as HTMLInputElement
    if(!input.files || input.files.length === 0){
      return
    }
    const file = input.files[0]
    this.imageFile = file

    const reader = new FileReader()
    reader.onload=()=>{
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit(){
    this.isSubmited = true
    if(this.productCreateForm.invalid){
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Remplissez correctement le formulaire"
      this.isSubmited = false
      this.productCreateForm.markAllAsTouched()
      setTimeout(()=>{
        this.showToast = false
      },2000)
      console.log("erreur du formulaire")
      return
    }

    const formValue = this.productCreateForm.value
    const formData = new FormData

    formData.append('name',formValue.name)
    formData.append('description',formValue.description)
    formData.append('price',formValue.price)
    formData.append('stock', formValue.stock)
    if(this.imageFile){
      formData.append('image', this.imageFile)
    }

    this.productSerice.createProduct(formData).subscribe({
      next: (response)=>{
        this.isSubmited = false
        this.toastType = 'success'
        this.toastMessage = "Shop créé avec succès"
        this.showToast = true
        setTimeout(()=>{
          this.showToast = false
        },2000)
        console.log(response)
        this.productCreateForm.reset()
        this.imageFile = null 
        this.imagePreview = null 
      },
      error: (error:HttpErrorResponse) =>{
        console.log(error.error)
        this.showToast = true
        this.toastType = 'error'
        this.toastMessage = error.error?.Erreur
        setTimeout(()=>{
          this.showToast = false
        },2000)
      }
    })
  }
}
