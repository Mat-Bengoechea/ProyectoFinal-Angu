import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/components/dialogo/dialogo.component';
import { StudentService } from '../../../../../core/services/student.service';
import { validarApellido, validarnombre, validateEmail } from '../../../../../shared/utils/validator';
import { Student } from '../../interface/interface';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
 myform: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private StudentService: StudentService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public studentData: Student
  ) {
    this.myform = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), validarnombre]],
      apellido: ['', [Validators.required, Validators.minLength(3) , validarApellido]],
      email: ['', [Validators.required, Validators.email, validateEmail]],
      edad: ['', [Validators.required, Validators.min(1)]],
      curso: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.myform.valid) {
      this.matDialog
        .open(DialogComponent)
        .afterClosed()
        .subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.StudentService.addStudentListobs(this.myform.value);
            this.myform.reset();
          }
        });
    } else {
      console.error('Formulario inválido');
    }
  }

    }
