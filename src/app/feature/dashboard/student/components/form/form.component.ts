import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { StudentService } from '../../../../../core/services/student.service';
import {
  validarApellido,
  validarnombre,
  validateEmail,
} from '../../../../../shared/utils/validator';
import { Student } from '../../interface/interface';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../../../../core/services/store';
import { Store } from '@ngrx/store';
import { StudentActions } from '../../store/student.actions';
import { DialogComponent } from '../../../../../shared/components/dialogo/dialogo.component';
import { selectStudentToEdit } from '../../store/student.selectors';

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
    private store: Store<RootState>
  ) {
    this.myform = this.fb.group({
      id: [''],
      nombre: [
        '',
        [Validators.required, Validators.minLength(3), validarnombre],
      ],
      apellido: [
        '',
        [Validators.required, Validators.minLength(3), validarApellido],
      ],
      email: ['', [Validators.required, Validators.email, validateEmail]],
      edad: ['', [Validators.required, Validators.min(1)]],
      curso: ['', [Validators.required]],
    });
  }

  ngOnInit(): void{
    this.store.select(selectStudentToEdit).subscribe((student)=>{
      if(student){
        this.myform.patchValue(student);
        this.isEdit = true;
      }else{
        this.myform.reset();
      }
    })
  }

  submitForm() {
    if (!this.isEdit) {
      this.myform.patchValue({
        id: uuid(),
      });
    }
    this.matDialog
      .open(DialogComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed){
            console.log(this.myform.value);
            if (this.isEdit){
              this.store.dispatch(
                StudentActions.updateStudent({ student: this.myform.value })
              );
            } else{
              this.store.dispatch(
                StudentActions.addStudent({student: this.myform.value})
              );
            }
            this.myform.reset({});
            this.isEdit = false;
            this.dialogRef.close(true);
          }
        },
        error: (error)=>{
          console.error('Error:',error);
        },
      });
  }
}
