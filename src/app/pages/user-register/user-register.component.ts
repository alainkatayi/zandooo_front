import { Component } from '@angular/core';
import { RegisterService } from '../../../core/services/register_service/register.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  registerForm: FormGroup
  is_connecting: Boolean = false
  error_message: string = ''
  success_message: string = ''
  register_type: 'error' | 'success' = 'success'
  show_toast: Boolean = false

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.is_connecting = true
      this.registerService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.is_connecting = false
          this.show_toast = true
          this.register_type = 'success'
          this.success_message = 'User registered successfully'
          setTimeout(() => {
            this.show_toast = false
          }, 2000);
          console.log('User registered successfully', response);
        },
        error: (error) => {
          this.is_connecting = false
          this.show_toast = true
          this.register_type = 'error'
          this.error_message = 'Error registering user'
          setTimeout(() => {
            this.show_toast = false
          }, 2000);
          console.error('Error registering user', error);
        }
      })
    }

    else {
      console.error('Form is invalid');
      this.show_toast = true
      this.register_type = 'error'
      this.error_message = 'Please fill all required fields'
      setTimeout(() => {
        this.show_toast = false
      }, 2000);
    }
  }

}
