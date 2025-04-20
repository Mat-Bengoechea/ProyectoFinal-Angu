import { Component, OnInit } from '@angular/core';
import { Student } from '../../interface/interface';
import { StudentService } from '../../../../core/services/student.service';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['nombrecompleto', 'email', 'edad', 'curso'];
  TableStudent: Student[] = [];
  constructor(private studenlistservice: StudentService) {
  }
  
  ngOnInit(): void {
    this.studenlistservice.StudentList$.subscribe((data)=> {
      this. TableStudent = data;
    })
    this.studenlistservice.getStudentListobs();
  }
}
