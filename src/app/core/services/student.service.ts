import { Injectable } from '@angular/core';
import { Student } from '../../feature/dashboard/student/interface/interface';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentSubject = new BehaviorSubject<Student[]>([]);
  StudentList$ = this.studentSubject.asObservable();

  constructor(private http: HttpClient) {}

  private _studentList: Student[] = [];

  deleteStudent(id: string): Observable<Student> {
   return this.http
      .delete<Student>(`${environment.apiUrl}/studentList/${id}`);
  }

  updateStudent(student: Student): Observable<Student> {
   return this.http
      .put<Student>(`${environment.apiUrl}/studentList/${student.id}`, student);
  }

  getStudentListobs() {
    this.studentSubject.next(this._studentList);
    return this.http
      .get<Student[]>(`${environment.apiUrl}/studentList`)
      .pipe(delay(2500));
  }

  getStudentById(id: string): Observable<Student>{
    return this.http.get<Student>(`${environment.apiUrl}/studentList/${id}`);
  }

  addStudentListobs(Student: Student): Observable<Student> {
   return this.http
      .post<Student>(`${environment.apiUrl}/studentList`, Student);
  }
}
