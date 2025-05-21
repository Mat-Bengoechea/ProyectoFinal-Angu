import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, Observable } from 'rxjs';
import { Course } from '../../feature/dashboard/courses/interface/course';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private coursesTitlesSubject = new BehaviorSubject<string[]>([]);
  coursesTitles$ = this.coursesTitlesSubject.asObservable();

  courseEdit = new BehaviorSubject<Course | null>(null);
  courseEdit$ = this.courseEdit.asObservable();

  constructor(private http: HttpClient) {}

  private _courses: Course[] = [];


  setUpdateCourse(id : string){
    const course = this._courses.find((course) => course.id === id);
    if (!course){
      alert('No se encontró el curso');
      return;
    }
    this.courseEdit.next(course);
  } 

  updateCourse (course: Course): Observable<Course> {
   return this.http.patch<Course>(`${environment.apiUrl}/courses/${course.id}`, course);
  }

  getCourses() {
    this.coursesSubject.next(this._courses);
   return this.http
      .get<Course[]>(`${environment.apiUrl}/courses`).pipe(delay(3000))
  }

  getCoursesTitles(): void {
    const names = this._courses.map((course) => course.title);
    this.coursesTitlesSubject.next(names);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.apiUrl}/courses`, course);
  }

  deleteCourse(id: string): Observable<Course> {
    return this.http.delete<Course>(`${environment.apiUrl}/courses/${id}`);
  }

  
}
