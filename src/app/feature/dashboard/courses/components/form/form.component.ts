import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/components/dialogo/dialogocourse.component';
import { CourseService } from '../../../../../core/services/course.service';
import { v4 as uuid } from 'uuid';
import { Course } from '../../interface/course';

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
    private courseService: CourseService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.formGroup = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
    });

    this.courseService.courseEdit$.subscribe((course) => {
      if (course) {
        this.formGroup.patchValue({
          id: course.id,
          title: course.title,
          description: course.description,
        });
        this.isEdit = true;
      } else {
        this.formGroup.reset();
      }
    });
  }

  submit() {
    if(!this.isEdit){
      this.formGroup.patchValue({
        id: uuid()
      });
    }
    this.matDialog
      .open(DialogComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            console.log(this.formGroup.value);
            if (this.isEdit) {
              this.courseService.updateCourse(this.formGroup.value);
            } else {
              this.courseService.addCourse(this.formGroup.value);
            }

            this.formGroup.reset();
            this.isEdit = false;
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
}
