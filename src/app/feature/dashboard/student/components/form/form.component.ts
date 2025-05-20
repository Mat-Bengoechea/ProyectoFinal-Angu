import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/components/dialogo/dialogo.component';
import { StudentService } from '../../../../../core/services/student.service';
import { validarApellido, validarnombre, validateEmail } from '../../../../../shared/utils/validator';
import { Student } from '../../interface/interface';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
 myform: FormGroup;
 isEdit: boolean = false;


  constructor(
    private matDialog: MatDialog,
    private StudentService: StudentService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public studentData: Student,
    private dialogRef: MatDialogRef<FormComponent>,
  ) {
    this.myform = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3), validarnombre]],
      apellido: ['', [Validators.required, Validators.minLength(3) , validarApellido]],
      email: ['', [Validators.required, Validators.email, validateEmail]],
      edad: ['', [Validators.required, Validators.min(1)]],
      curso: ['', [Validators.required]],
    });

    this.StudentService.studentEdit$.subscribe((student) => {
      if (student) {
        console.log('Cargando estudiante para edición:', student);
        this.myform.patchValue({
          id: student.id,
          nombre: student.nombre,
          apellido: student.apellido,
          email: student.email,
          edad: student.edad,
          curso: student.curso,
        });
        this.isEdit = true;
      } else {
        this.myform.reset();
        this.isEdit = false;
      }
    });
  }

  submitForm() {
    if (this.myform.valid) {
      if (this.isEdit) {
        this.StudentService.updateStudent(this.myform.value);
      } else {
        this.myform.patchValue({
          id: uuid(), 
        });
        this.StudentService.addStudentListobs(this.myform.value);
      }
      this.myform.reset();
      this.isEdit = false;
      this.dialogRef.close();
    } else {
      console.error('Formulario inválido');
    }
  }

    }
