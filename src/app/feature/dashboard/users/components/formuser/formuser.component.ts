import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarnombre, validarpassword, validateEmail } from '../../../../../shared/utils/validator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../../../../../core/services/UserService.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-formuser',
  standalone: false,
  templateUrl: './formuser.component.html',
  styleUrl: './formuser.component.scss',
})
export class FormuserComponent {
  formuser: FormGroup;
  isEdit: boolean = false;
  constructor(
    private matDialog: MatDialog,
    private userService: userService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormuserComponent>,
  ) {
    this.formuser = this.fb.group({
      id: [''],
      fullname: ['', [Validators.required, Validators.minLength(3), validarnombre]],
      email: ['', [Validators.required, Validators.email, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(6),validarpassword]],
      role: ['', [Validators.required]],
    });


    this.userService.userEdit$.subscribe((user) => {
      if (user) {
        console.log('Cargando usuario para edición:', user);
        this.formuser.patchValue({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          password: user.password,
          role: user.role,
        });
        this.isEdit = true;
      } else {
        this.formuser.reset();
        this.isEdit = false;
      }
    });
  }

  submitFormuser() {
    if (this.formuser.valid) {
      if (this.isEdit) {
        this.userService.updatedUser(this.formuser.value);
      } else {
        this.formuser.patchValue({
          id: uuid(),
        });
        this.userService.adduserListobs(this.formuser.value);
      }
      this.formuser.reset();
      this.isEdit = false;
      this.dialogRef.close();
    } else {
      alert('Formulario inválido');
    }
  }
}
