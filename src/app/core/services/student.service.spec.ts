import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { StudentService } from './student.service';
import { Student } from '../../feature/dashboard/student/interface/interface';
import { environment } from '../../../environments/environment.development';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  const mockStudent: Student = {
    id: '1',
    nombre: 'Lucas',
    apellido: 'Pérez',
    email: 'lucas@example.com',
    edad: 25,
    curso: 'Angular',
  };

  const mockStudents: Student[] = [
    mockStudent,
    {
      id: '2',
      nombre: 'María',
      apellido: 'Gómez',
      email: 'maria@example.com',
      edad: 22,
      curso: 'React',
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });

    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addStudentListobs() should POST a new student', () => {
    service.addStudentListobs(mockStudent).subscribe(student => {
      expect(student).toEqual(mockStudent);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockStudent);
    req.flush(mockStudent);
  });

  it('getStudentListobs() should GET students with delay', (done) => {
    service.getStudentListobs().subscribe(students => {
      expect(students).toEqual(mockStudents);

      service.StudentList$.subscribe(list => {
        expect(list).toEqual([]);
        done();
      });
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents);
  });

  it('deleteStudent() should DELETE a student by id', () => {
    service.deleteStudent('1').subscribe(student => {
      expect(student).toEqual(mockStudent);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockStudent);
  });

  it('updateStudent() should PUT an updated student', () => {
    const updatedStudent = { ...mockStudent, nombre: 'Lucas Actualizado' };

    service.updateStudent(updatedStudent).subscribe(student => {
      expect(student.nombre).toBe('Lucas Actualizado');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList/${updatedStudent.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedStudent);
    req.flush(updatedStudent);
  });

  it('getStudentById() should GET a student by id', () => {
    service.getStudentById('1').subscribe(student => {
      expect(student).toEqual(mockStudent);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudent);
  });
});
