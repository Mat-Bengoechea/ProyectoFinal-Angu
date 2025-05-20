import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { User } from '../../feature/auth/interfaces/User';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClientTesting(),
        provideMockStore({})
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('login', () => {
    it('should return user if credentials are valid', (done) => {
      const email = 'alfro@gmail.com';
      const password = '07291';
      const mockUser: User = { email, role: 'admin', fullname: 'Alfro', password };

      service.login(email, password).subscribe(user => {
        expect(user).toEqual(mockUser);
        done();
      });

      const req = httpMock.expectOne(`/api/users?email=${email}&password=${password}`);
      expect(req.request.method).toBe('GET');
      req.flush([mockUser]);
    });

    it('should return null if credentials are invalid', (done) => {
      const email = 'invalid@gmail.com';
      const password = 'wrongpassword';

      service.login(email, password).subscribe(user => {
        expect(user).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`/api/users?email=${email}&password=${password}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('register', () => {
    it('should register a new user', (done) => {
      const newUser: User = { email: 'new@mail.com', password: '1234', role: 'user', fullname: 'Nuevo' };

      service.register(newUser).subscribe(user => {
        expect(user).toEqual(newUser);
        done();
      });

      const req = httpMock.expectOne('/api/users');
      expect(req.request.method).toBe('POST');
      req.flush(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user', (done) => {
      const id = '1';
      const changes = { fullname: 'Nuevo Nombre' };
      const updatedUser: User = { id, email: 'a@a.com', password: '123', role: 'user', fullname: 'Nuevo Nombre' };

      service.updateUser(id, changes).subscribe(user => {
        expect(user).toEqual(updatedUser);
        done();
      });

      const req = httpMock.expectOne(`/api/users/${id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', (done) => {
      const id = '1';

      service.deleteUser(id).subscribe(response => {
        expect(response).toBeUndefined();
        done();
      });

      const req = httpMock.expectOne(`/api/users/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('verifyToken', () => {
    it('should return true if token matches', (done) => {
      localStorage.setItem('token', 'my-secret-token');
      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeTrue();
        done();
      });
    });

    it('should return false if token does not match', (done) => {
      localStorage.setItem('token', 'invalid-token');
      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeFalse();
        done();
      });
    });

    it('should return false if token is not set', (done) => {
      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeFalse();
        done();
      });
    });
  });

  describe('logout', () => {
    it('should clear the current user and remove token from localStorage', (done) => {
      localStorage.setItem('user', JSON.stringify({ email: 'cami@gmail.com', role: 'user' }));
      localStorage.setItem('token', 'my-secret-token');

      service.authUser$.subscribe((user) => {
        expect(user).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
        done();
      });

      service.logout();
    });
  });

});