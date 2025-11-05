import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../core/services/register_service/register.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delivery-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './delivery-register.component.html',
  styleUrl: './delivery-register.component.css'
})
export class DeliveryRegisterComponent {
  deliveryRegisterForm: FormGroup
  is_connecting: Boolean = false
  error_message: string = ''
  success_message: string = ''
  register_type: 'error' | 'success' = 'success'
  show_toast: Boolean = false

  constructor(private fb: FormBuilder, private register_delivery_service: RegisterService) {
    this.deliveryRegisterForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['delivery', [Validators.required]],
      delivery_Agent_Profile: this.fb.group({
        phone_number: ['', [Validators.required]],
        delivery_start_time: ['', [Validators.required]],
        delivery_end_time: ['', [Validators.required]],
        adress: ['', [Validators.required]],
      })
    })
  }

  onSubmit() {
    if (this.deliveryRegisterForm.valid) {
      this.is_connecting = true
      this.register_delivery_service.register(this.deliveryRegisterForm.value).subscribe({
        next: (res) => {
          this.is_connecting = false
          this.register_type = 'success'
          this.show_toast = true
          this.success_message = "Delivery registered successfully"
          setTimeout(() => {
            this.show_toast = false
          }, 2000);
          console.log("Delivery registered successfully", res);
        },
        error: (err) => {
          this.is_connecting = false
          this.register_type = 'error'
          this.show_toast = true
          this.error_message = "Error registering delivery"
          setTimeout(() => {
            this.show_toast = false
          }, 2000);
          console.error("Error registering delivery", err);
        }
      })
    }
    else {
      this.show_toast = true
      this.register_type = 'error'
      this.error_message = "Form is invalid"
      setTimeout(() => {
        this.show_toast = false
      }, 2000);
      console.error("Form is invalid");
    }
  }
}


