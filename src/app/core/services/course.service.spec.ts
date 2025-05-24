import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.development';
import { Course } from '../../feature/dashboard/courses/interface/course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const dummyCourses: Course[] = [
    { id: '1', title: 'Curso 1', description: 'Desc 1', time: '10' },
    { id: '2', title: 'Curso 2', description: 'Desc 2', time: '20' }
  ];

  const dummyCourse: Course = { id: '1', title: 'Curso 1', description: 'Desc 1', time: '10' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [CourseService, provideHttpClientTesting()]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCourses() should perform GET and return courses with delay', (done) => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(dummyCourses);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });

  it('updateCourse() should perform PATCH and return updated course', () => {
    const updatedCourse = { ...dummyCourse, title: 'Curso 1 Actualizado' };

    service.updateCourse(updatedCourse).subscribe(course => {
      expect(course.title).toBe('Curso 1 Actualizado');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/${updatedCourse.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedCourse);

    req.flush(updatedCourse);
  });

  it('getCourseById() should perform GET by id and return course', () => {
    service.getCourseById('1').subscribe(course => {
      expect(course).toEqual(dummyCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourse);
  });

  it('addCourse() should perform POST and return new course', () => {
    const newCourse: Course = { id: '3', title: 'Curso 3', description: 'Desc 3', time: '30' };

    service.addCourse(newCourse).subscribe(course => {
      expect(course).toEqual(newCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  });

  it('deleteCourse() should perform DELETE and return deleted course', () => {
    service.deleteCourse('1').subscribe(course => {
      expect(course).toEqual(dummyCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyCourse);
  });

  it('getCoursesTitles() should update coursesTitlesSubject with titles from _courses', (done) => {
    (service as any)._courses = dummyCourses;

    service.coursesTitles$.subscribe(titles => {
      expect(titles).toEqual(['Curso 1', 'Curso 2']);
      done();
    });

    service.getCoursesTitles();
  });

  it('courses$ observable should emit the current _courses value when getCourses() is called', (done) => {
    (service as any)._courses = dummyCourses;

    service.courses$.subscribe(courses => {
      expect(courses).toEqual(dummyCourses);
      done();
    });

    service.getCourses();
  });
});
