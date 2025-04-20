import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../form/dialogo/dialogo.component';
import { StudentService } from '../../../../core/services/student.service';
import { validarApellido, validarnombre, validateEmail } from '../../../../shared/utils/validator';

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

  
  

  // submitForm() {
  //   this.matDialog
  //     .open(DialogComponent)
  //     .afterClosed()
  //     .subscribe({
  //       next: (confirmed: boolean) => {
  //         if (confirmed) {
  //           this.StudentService.addStudentListobs({
  //             nombre: this.myform.value.nombre || '',
  //             apellido: this.myform.value.apellido || '',
  //             email: this.myform.value.email || '',
  //             edad: Number(this.myform.value.edad) || 0,
  //             curso: (['Angular', 'React', 'Vue', 'Svelte', 'Ember'].includes(
  //               this.myform.value.curso || ''
  //             )
  //               ? this.myform.value.curso
  //               : 'Angular') as
  //               | 'Angular'
  //               | 'React'
  //               | 'Vue'
  //               | 'Svelte'
  //               | 'Ember',
  //           });
  //           this.myform.reset();

  //         }
  //       },
  //       error: (error) => {
  //         console.error('Error:', error);
  //       },
  //     });
  // }

