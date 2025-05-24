import { TestBed } from '@angular/core/testing';
import { StudentService } from './student.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.development';
import { Student } from '../../feature/dashboard/student/interface/interface';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  const dummyStudents: Student[] = [
    { id: '1', nombre: 'Juan', apellido: 'Perez', edad: 20, email: 'juan@example.com', curso: 'Angular' },
    { id: '2', nombre: 'Ana', apellido: 'Gomez', edad: 22, email: 'ana@example.com', curso: 'React' }
  ];

  const dummyStudent: Student = { id: '1', nombre: 'Juan', apellido: 'Perez', edad: 20, email: 'juan@example.com', curso: 'Angular' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentService, provideHttpClientTesting()]
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

  it('getStudentListobs() should emit current _studentList and perform GET with delay', (done) => {
    (service as any)._studentList = dummyStudents;

    service.StudentList$.subscribe(list => {
      expect(list).toEqual(dummyStudents);
      done();
    });

    service.getStudentListobs().subscribe(students => {
      expect(students).toEqual(dummyStudents);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStudents);
  });

  it('deleteStudent() should perform DELETE and return deleted student', () => {
    service.deleteStudent('1').subscribe(student => {
      expect(student).toEqual(dummyStudent);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyStudent);
  });

  it('updateStudent() should perform PUT and return updated student', () => {
    const updatedStudent = { ...dummyStudent, nombre: 'Juan Updated' };

    service.updateStudent(updatedStudent).subscribe(student => {
      expect(student.nombre).toBe('Juan Updated');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList/${updatedStudent.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedStudent);
    req.flush(updatedStudent);
  });

  it('getStudentById() should perform GET by id and return student', () => {
    service.getStudentById('1').subscribe(student => {
      expect(student).toEqual(dummyStudent);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStudent);
  });

  it('addStudentListobs() should perform POST and return new student', () => {
    const newStudent: Student = { id: '3', nombre: 'Maria', apellido: 'Lopez', edad: 25, email: 'maria@example.com', curso: 'Vue' };

    service.addStudentListobs(newStudent).subscribe(student => {
      expect(student).toEqual(newStudent);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/studentList`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newStudent);
    req.flush(newStudent);
  });
});
