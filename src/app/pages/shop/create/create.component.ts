import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../components/client/navbar/navbar.component";
import { FooterComponent } from "../../../components/client/footer/footer.component";
import { ShopService } from '../../../../core/services/shop_service/shop.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private router = inject(Router);
  
  constructor(private shopService: ShopService, private fb: FormBuilder) { }

  shopCreateForm!: FormGroup
  logoFile!: File | null
  logoPreview: string | ArrayBuffer | null = null
  isSubmited: Boolean = false
  showToast: Boolean = false
  toastType: 'success' | 'error' = 'success'
  toastMessage: string = ''
  errorMessage: string = ''
  successMessage: string = ''


  ngOnInit() {
    this.shopCreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      opening_hours: ['', Validators.required],
      closing_hours: ['', Validators.required],
      adress: ['', Validators.required],
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0) {
      return
    }

    const file = input.files[0];
    // if(!input.type.startsWith('image/')){
    //   console.log('le fichier doit etre une image')
    //   return 
    // }

    this.logoFile = file

    const reader = new FileReader()
    reader.onload = () => {
      this.logoPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.isSubmited = true
    if (this.shopCreateForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Remplissez correctement le formulaire"
      this.isSubmited = false
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("erreur du formulaire")
      return
    }

    const formValue = this.shopCreateForm.value
    const formData = new FormData

    formData.append('name', formValue.name)
    formData.append('description', formValue.description)
    formData.append('opening_hours', formValue.opening_hours)
    formData.append('closing_hours', formValue.closing_hours)
    formData.append('adress', formValue.adress)
    if (this.logoFile) {
      formData.append('logo', this.logoFile)
    }

    this.shopService.createShop(formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastType = 'success'
        this.toastMessage = "Shop créé avec succès"
        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['shop/overview'])
        }, 2000)
        console.log("shop created", response)
        this.shopCreateForm.reset()
        this.logoFile = null
        this.logoPreview = null
      },

      error: (error:HttpErrorResponse) => {
        this.isSubmited = false
        this.toastType = 'error'
        this.showToast = true
        this.toastMessage = error.error?.Erreur
        setTimeout(()=>{
          this.showToast = false
        },2000)
        console.log(error)
      }
    })
  }

}
