import { Injectable } from '@angular/core';
import { Student } from '../../feature/dashboard/student/interface/interface';
import { BehaviorSubject, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentSubject = new BehaviorSubject<Student[]>([]);
  StudentList$ = this.studentSubject.asObservable();

  studentEdit = new BehaviorSubject<Student | null>(null);
  studentEdit$ = this.studentEdit.asObservable();

  constructor(private http: HttpClient) {}

  private _studentList: Student[] = [];

  get studentList(): Student[] {
    return this._studentList;
  }

  deleteStudent(id: string) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar este estudiante?'
    );
    if (!confirmDelete) {
      return;
    }
    this.http
      .delete<Student>(`${environment.apiUrl}/studentList/${id}`)
      .subscribe({
        next: (Student) => {
          this._studentList = this._studentList.filter((s) => s.id !== id);
          this.studentSubject.next(this._studentList);
        },
        error: (error) => {
          console.error('Error eliminando estudiante:', error);
        },
      });
  }

  setUpdateStudent(id: string) {
    const student = this._studentList.find((student) => student.id === id);
    if (!student) {
      alert('No se encontró el estudiante');
      return;
    }
    this.studentEdit.next(student);
  }

  updateStudent(student: Student): void {
    this.http
      .put<Student>(`${environment.apiUrl}/studentList/${student.id}`, student)
      .subscribe({
        next: (updatedStudent) => {
          this._studentList = this._studentList.map((s) =>
            s.id === updatedStudent.id ? updatedStudent : s
          );
          this.studentSubject.next(this._studentList);
          this.studentEdit.next(null);
        },
        error: (error) => {
          console.error('Error actualizando estudiante:', error);
        },
      });
  }

  getStudentListobs() {
    this.studentSubject.next(this._studentList);
    return this.http
      .get<Student[]>(`${environment.apiUrl}/studentList`)
      .pipe(delay(3000));
  }

  addStudentListobs(Student: Student): void {
    this.http
      .post<Student[]>(`${environment.apiUrl}/studentList`, Student)
      .subscribe({
        next: (students) => {
          this._studentList = [...this._studentList, Student];
          this.studentSubject.next(this._studentList);
        },
        error: (error) => {
          console.error('Error al agregar estudiante:', error);
        },
      });
  }
}
