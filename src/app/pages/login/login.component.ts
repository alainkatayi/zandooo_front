import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../core/services/login_service/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { UserLocalService } from '../../../core/services/user_local_service/user-local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  is_connecting:Boolean = false
  error_message:string = ''
  success_message:string = ''
  login_type:'error'| 'success' = 'success'
  show_toast:Boolean = false
  private router = inject(Router);


  constructor(private fb: FormBuilder, private loginService: LoginService,private user_local_service:UserLocalService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.is_connecting = true
    const loginData = this.loginForm.value
    this.loginService.login(loginData).subscribe({
      next: (response) => {
      this.user_local_service.store_user_local(response)
      this.is_connecting = false
      this.show_toast = true
      this.login_type = 'success'
      this.success_message = 'Login successful'
      console.log('Login successful', response)
      setTimeout(()=>{
        this.show_toast = false
        this.router.navigate(['/shop/explorer'])
      },2000)
      },
      error: (error) => {
        this.is_connecting = false
        this.show_toast = true
        this.login_type = 'error'
        this.error_message = 'username or password incorrect'
        console.error('Login failed', error);
        setTimeout(()=>{
          this.show_toast = false
        },2000)
      }
    })
  }
}
