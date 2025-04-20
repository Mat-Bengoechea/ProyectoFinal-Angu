import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../form/dialogo/dialogo.component';
import { StudentService } from '../../../../core/services/student.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  myForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    edad: new FormControl(''),
    curso: new FormControl(''),
  });

  constructor(
    private matDialog: MatDialog,
    private StudentService: StudentService,
    private dialogRef: MatDialogRef<FormComponent>
  ) {}

  submitForm() {
    this.matDialog
      .open(DialogComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            this.StudentService.addStudentListobs({
              nombre: this.myForm.value.nombre || '',
              apellido: this.myForm.value.apellido || '',
              email: this.myForm.value.email || '',
              edad: Number(this.myForm.value.edad) || 0,
              curso: (['Angular', 'React', 'Vue', 'Svelte', 'Ember'].includes(
                this.myForm.value.curso || ''
              )
                ? this.myForm.value.curso
                : 'Angular') as
                | 'Angular'
                | 'React'
                | 'Vue'
                | 'Svelte'
                | 'Ember',
            });
            this.myForm.reset();

            this.dialogRef.close();
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
}
