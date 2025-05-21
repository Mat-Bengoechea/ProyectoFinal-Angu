import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { validateEmail } from '../../../shared/utils/validator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Optional } from '@angular/core';
import { FormuserComponent } from '../../dashboard/users/components/formuser/formuser.component';
import { Store } from '@ngrx/store';
import { login } from '../../../core/services/store/auth/auth.actions';


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
  private dialog: MatDialog,
  @Optional() private MatDialogRef: MatDialogRef<LoginComponent>,
  private store: Store
){
  this.loginForm = this.fb.group({
    email: ['mateo@gmail.com', [Validators.required, Validators.email, validateEmail]],
    password: ['1234', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
  })
}


openFormDialog(): void {
  this.dialog.open(FormuserComponent, {
    width: '500px',
    height: 'auto',
    disableClose: false,
    data: null,
  });};


submit() {
  if (this.loginForm.invalid) return;
  const { email, password } = this.loginForm.value;
  this.store.dispatch(login({ email, password }));
}
}
