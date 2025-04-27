import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../feature/dashboard/courses/interface/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private coursesTitlesSubject = new BehaviorSubject<string[]>([]);
  coursesTitles$ = this.coursesTitlesSubject.asObservable();

  private _courses: Course[] = [
    {
      title: 'Angular',
      description:
        'Framework completo de desarrollo frontend creado por Google. Usa TypeScript, tiene una estructura rígida y muchas herramientas integradas (como inyección de dependencias y enrutador).',
    },
    {
      title: 'React',
      description:
        'Biblioteca desarrollada por Meta (Facebook) para construir interfaces de usuario. Usa JavaScript y JSX, es flexible y se basa en componentes reutilizables.',
    },
    {
      title: 'Vue',
      description:
        'Framework progresivo que permite construir interfaces gradualmente. Es simple de aprender, combina HTML, CSS y JS en componentes, y tiene una curva de aprendizaje suave.',
    },
    {
      title: 'Svelte',
      description: 'Framework innovador que compila los componentes a JavaScript puro en tiempo de desarrollo, eliminando el runtime. Muy ligero y rápido.',
    },
    {
      title: 'Ember',
      description: 'Framework completo para aplicaciones ambiciosas. Ofrece convenciones fuertes y muchas herramientas listas para usar, aunque es más pesado y menos popular hoy en día.',
    },
  ];

  getCourses(): void {
    this.coursesSubject.next(this._courses);
  }

  getCoursesTitles(): void {
    const names = this._courses.map((course) => course.title);
    this.coursesTitlesSubject.next(names);
  }
  
  addCourse(course: Course): void {
    this._courses = [...this._courses, course];
    this.coursesSubject.next(this._courses);
    this.coursesTitlesSubject.next(this._courses.map((course) => course.title));
  }

  getByTitle(title: string) {
    return new Observable<Course>((subscriber) => {
      const course = this._courses.find(
        (course) => course.title.toLowerCase() === title.toLowerCase()
      );

      if (course) {
        subscriber.next(course);
      } else {
        subscriber.error('No pudimos encontrar el curso que buscas');
      }
    });
  }
}
