import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { validateEmail } from '../../../shared/utils/validator';
import { MatDialogRef } from '@angular/material/dialog';
import { Optional } from '@angular/core';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
loginForm: FormGroup

constructor(private fb:FormBuilder,
  private router: Router,
  private authService: AuthService,
  @Optional() private MatDialogRef: MatDialogRef<LoginComponent>,


){
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, validateEmail]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
  })
}
submit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    const isLoggedIn = this.authService.login(email, password);

    if (!isLoggedIn) {
      alert('Email o contraseña incorrectos');
      return;
    }

    if (this.MatDialogRef) {
      this.MatDialogRef.close();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
}
