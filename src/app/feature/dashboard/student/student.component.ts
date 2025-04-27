import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../student/components/form/form.component';
import { Student } from './interface/interface';


@Component({
  selector: 'student-form',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  openDialog(arg0: string,arg1: string) {
    throw new Error('Method not implemented.');
    }

    constructor(private dialog: MatDialog) { }


    openFormDialog(student?: Student): void {
        this.dialog.open(FormComponent, {
          width: '500px',
          height: 'auto',
          disableClose: false,
          data: student ? student : null,
        });
      }
}
