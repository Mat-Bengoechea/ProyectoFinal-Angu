import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../../feature/dashboard/courses/interface/course';

@Component({
  selector: 'app-course-info-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p><strong>Descripción:</strong> {{ data.description }}</p>
      <p><strong>Tiempo de cursado:</strong> {{ data.time }} horas</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `
})
export class CourseInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Course) {}
}