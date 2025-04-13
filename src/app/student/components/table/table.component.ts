import { Component } from '@angular/core';
import { Student } from '../../interface/interface';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  displayedColumns: string[] = ['nombrecompleto', 'email', 'edad', 'curso'];
  dataSource: Student[] = [];


  studentList: Student[] = [

    {
      nombre: "Juan",
      apellido: "Pérez",
      email: "pereas22@gmail.com",
      edad: 25,
      curso: "Angular",
    },

    {
      nombre: "Ana",
      apellido: "Gómez",
      email: "gomeana@gmail.com",
      edad: 30,
      curso: "React",
    }

  ];

  constructor() {
    this.dataSource = this.studentList;
  }

}
