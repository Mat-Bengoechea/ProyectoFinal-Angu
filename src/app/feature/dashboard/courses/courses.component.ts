import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormComponent} from './components/form/form.component';
import { Course } from './interface/course';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  openDialog(arg0: string,arg1: string) {
    throw new Error('Method not implemented.');
    }
  constructor(private dialog: MatDialog) { }

  openFormDialog(course?: Course): void {
    this.dialog.open(FormComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
      data: course ? course : null,
    });
  }

}
