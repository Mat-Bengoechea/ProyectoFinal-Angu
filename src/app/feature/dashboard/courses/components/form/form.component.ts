import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogcourseComponent } from '../../../../../shared/components/dialogo/dialogocourse.component';
import { v4 as uuid } from 'uuid';
import {
  validardescripcion,
  validartitle,
} from '../../../../../shared/utils/validator';
import { Store } from '@ngrx/store';
import { CourseActions } from '../../store/course.actions';
import { RootState } from '../../../../../core/services/store';
import {
  selectCourses,
  selectCourseToEdit,
} from '../../store/course.selectors';

@Component({
  selector: 'course-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private store: Store<RootState>,
    private dialogRef: MatDialogRef<FormComponent>
  ) {
    this.formGroup = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3), validartitle]],
      description: [
        '',
        [Validators.required, Validators.minLength(15), validardescripcion],
      ],
      time: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
    console.log('Form Group Initial Values:', this.formGroup.value);
  }
  ngOnInit(): void {
    this.store.select(selectCourseToEdit).subscribe((course) => {
      if (course) {
        this.formGroup.patchValue(course);
        this.isEdit = true;
      } else {
        this.formGroup.reset();
      }
    });
  }

  submit() {
    if (!this.isEdit) {
      this.formGroup.patchValue({
        id: uuid(),
      });
    }
    this.matDialog
      .open(DialogcourseComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            console.log(this.formGroup.value);
            if (this.isEdit) {
              this.store.dispatch(
                CourseActions.updateCourse({ course: this.formGroup.value })
              );
              this.store.select(selectCourses).subscribe((courses) => {
                console.log('Cursos después del update:', courses);
              });
            } else {
              this.store.dispatch(
                CourseActions.addCourse({ course: this.formGroup.value })
              );
            }

            this.formGroup.reset({
              id: '',
              title: '',
              description: '',
              time: '',
            });
            this.isEdit = false;
            this.dialogRef.close(true);
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
}
