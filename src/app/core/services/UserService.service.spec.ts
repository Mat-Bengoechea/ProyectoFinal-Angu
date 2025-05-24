import { TestBed } from '@angular/core/testing';
import { userService } from './UserService.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.development';
import { Users } from '../../feature/dashboard/users/interface/interface';

describe('userService', () => {
  let service: userService;
  let httpMock: HttpTestingController;

  const dummyUsers: Users[] = [
    { id: '1', email: 'jose@example.com', password: '1234', role: 'admin', fullname: 'Jose Luis' },
    { id: '2', email: 'ana@example.com', password: '5678', role: 'user', fullname: 'Ana Martinez' }
  ];

  const dummyUser: Users = { id: '1', email: 'jose@example.com', password: '1234', role: 'admin', fullname: 'Jose Luis' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [userService, provideHttpClientTesting()]
    });

    service = TestBed.inject(userService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getuserListobs() should emit current _userlist and perform GET with delay', (done) => {
    (service as any)._userlist = dummyUsers;

    service.UserList$.subscribe(list => {
      expect(list).toEqual(dummyUsers);
      done();
    });

    service.getuserListobs().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('deleteUser() should perform DELETE and return deleted user', () => {
    service.deleteUser('1').subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyUser);
  });

  it('updatedUser() should perform PUT and return updated user', () => {
    const updatedUser = { ...dummyUser, fullname: 'Jose Updated' };

    service.updatedUser(updatedUser).subscribe(user => {
      expect(user.fullname).toBe('Jose Updated');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('getUserById() should perform GET by id and return user', () => {
    service.getUserById('1').subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('adduser() should perform POST and return new user', () => {
    const newUser: Users = { id: '3', email: 'maria@example.com', password: 'pass123', role: 'user', fullname: 'Maria Lopez' };

    service.adduser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);
  });

  it('userName$ should emit initial username', (done) => {
    service.userName$.subscribe(name => {
      expect(name).toBe('Jose Luis');
      done();
    });
  });
});
