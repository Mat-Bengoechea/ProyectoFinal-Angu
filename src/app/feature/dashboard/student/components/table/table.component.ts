import { Component, OnInit } from '@angular/core';
import { Student } from '../../interface/interface';
import { StudentService } from '../../../../../core/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'student-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['nombrecompleto', 'email', 'edad', 'curso', 'actions'];
  TableStudent: Student[] = [];
  constructor(private studenlistservice: StudentService,
    private dialog: MatDialog,
  ) {
  }
  
  ngOnInit(): void {
    this.studenlistservice.StudentList$.subscribe((data)=> {
      this. TableStudent = data;
    })
    this.studenlistservice.getStudentListobs();
  }

  onEdit(student: Student) {
    this.dialog.open(FormComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
      data: student,
    });
    }

    onDelete(student: Student) {
      if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
        this.TableStudent = this.TableStudent.filter((s) => s !== student);
      }
    }
}
