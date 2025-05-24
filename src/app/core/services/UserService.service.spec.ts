import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { userService } from './UserService.service';
import { Users } from '../../feature/dashboard/users/interface/interface';
import { environment } from '../../../environments/environment.development';

describe('UserService', () => {
  let service: userService;
  let httpMock: HttpTestingController;

  const mockUser: Users = {
    id: '1',
    fullname: 'Jose Luis',
    email: 'jose@example.com',
    password: '1234',
    role: 'admin',
  };

  const mockUsers: Users[] = [mockUser];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        userService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(userService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('adduser() should POST a new user', () => {
    service.adduser(mockUser).subscribe((user: Users) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });

  it('getuserListobs() should GET user list and emit current _userlist', (done) => {
    service.getuserListobs().subscribe((users: Users[]) => {
      expect(users).toEqual(mockUsers);

      service.UserList$.subscribe((list: Users[]) => {
        expect(list).toEqual([]);
        done();
      });
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('deleteUser() should DELETE a user by ID', () => {
    service.deleteUser('1').subscribe((user: Users) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockUser);
  });

  it('updatedUser() should PUT an updated user', () => {
    const updatedUser: Users = { ...mockUser, fullname: 'Jose Luis Actualizado' };

    service.updatedUser(updatedUser).subscribe((user: Users) => {
      expect(user.fullname).toBe('Jose Luis Actualizado');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('getUserById() should GET a user by ID', () => {
    service.getUserById('1').subscribe((user: Users) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('userName$ should emit initial name "Jose Luis"', (done) => {
    service.userName$.subscribe((name: string) => {
      expect(name).toBe('Jose Luis');
      done();
    });
  });
});
