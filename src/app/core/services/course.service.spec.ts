import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Course } from '../../feature/dashboard/courses/interface/course';
import { environment } from '../../../environments/environment.development';

describe('Course Service Test', () => {
  let courseService: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    courseService = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
});
    afterEach(() => {
      httpMock.verify();
    });

    it('Test', ()=>{
      const course = {id: '23234asd3f23d', title: 'Rev20'}as Course;

      courseService.addCourse(course).subscribe((response)=>{
        expect(response).toEqual(course);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(course);

      req.flush(course);
    })
  it('should get courses via GET with delay', (done) => {
    const courses: Course[] = [
      { id: '1', title: 'Course 1' } as Course,
      { id: '2', title: 'Course 2' } as Course,
    ];

    courseService.getCourses().subscribe((response) => {
      expect(response).toEqual(courses);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(courses);
  });

  it('should get course by id via GET', () => {
    const course = { id: '1', title: 'Course 1' } as Course;

    courseService.getCourseById('1').subscribe((response) => {
      expect(response).toEqual(course);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('GET');
    req.flush(course);
  });

  it('should update course via PATCH', () => {
    const updatedCourse = { id: '1', title: 'Updated Course' } as Course;

    courseService.updateCourse(updatedCourse).subscribe((response) => {
      expect(response).toEqual(updatedCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/${updatedCourse.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);
  });

  it('should delete course via DELETE', () => {
    const course = { id: '1', title: 'Course 1' } as Course;

    courseService.deleteCourse(course.id).subscribe((response) => {
      expect(response).toEqual(course);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/${course.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(course);
  });

  });

