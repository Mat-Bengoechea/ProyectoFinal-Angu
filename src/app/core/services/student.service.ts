import { Injectable } from '@angular/core';
import { Student } from '../../feature/dashboard/student/interface/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private dataSubject = new BehaviorSubject<Student[]>([]);
  StudentList$ = this.dataSubject.asObservable();

  private _studentList: Student[] = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'pereas22@gmail.com',
      edad: 25,
      curso: 'Angular',
    },

    {
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'gomeana@gmail.com',
      edad: 30,
      curso: 'React',
    },
  ];

  get studentList(): Student[] {
    return this._studentList;
  }

  getStudentListobs() {
    this.dataSubject.next(this._studentList);
  }

  addStudentListobs(Student: Student) {
    this._studentList = [...this._studentList, Student];
    this.dataSubject.next(this._studentList);
  }

  constructor() {}
}
