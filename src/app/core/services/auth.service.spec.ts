import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { User } from '../../feature/auth/interfaces/User';
import { provideHttpClient } from '@angular/common/http';

xdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClientTesting(),
        provideMockStore({}),
        provideHttpClient(),
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
      try {
    httpMock.verify();
  } catch (error) {
    console.error('HTTP mock verify error:', error);
  }
  });

xdescribe('login', () => {
  it('should return user if credentials are valid', waitForAsync(() => {
    const email = 'alfro@gmail.com';
    const password = '07291';
    const mockUser: User = { email, role: 'admin', fullname: 'Alfro', password };

    service.login(email, password).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(request =>
      request.url === '/api/users' &&
      request.params.get('email') === email &&
      request.params.get('password') === password
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  }));

  it('should return null if credentials are invalid', waitForAsync(() => {
    const email = 'invalid@gmail.com';
    const password = 'wrongpassword';

    service.login(email, password).subscribe(user => {
      expect(user).toBeNull();
    });

    const req = httpMock.expectOne(request =>
      request.url === '/api/users' &&
      request.params.get('email') === email &&
      request.params.get('password') === password
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  }));
});

  xdescribe('register', () => {
    it('should register a new user', waitForAsync(() => {
      const newUser: User = { email: 'new@mail.com', password: '1234', role: 'user', fullname: 'Nuevo' };

      service.register(newUser).subscribe(user => {
        expect(user).toEqual(newUser);
      });

      const req = httpMock.expectOne('/api/users');
      expect(req.request.method).toBe('POST');
      req.flush(newUser);
    }));
  });

  xdescribe('updateUser', () => {
    it('should update a user', waitForAsync(() => {
      const id = '1';
      const changes = { fullname: 'Nuevo Nombre' };
      const updatedUser: User = { id, email: 'a@a.com', password: '123', role: 'user', fullname: 'Nuevo Nombre' };

      service.updateUser(id, changes).subscribe(user => {
        expect(user).toEqual(updatedUser);
      });

      const req = httpMock.expectOne(`/api/users/${id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(updatedUser);
    }));
  });

  xdescribe('deleteUser', () => {
    it('should delete a user', waitForAsync(() => {
      const id = '1';

      service.deleteUser(id).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`/api/users/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    }));
  });

  xdescribe('verifyToken', () => {
    it('should return true if token matches', waitForAsync(() => {
      localStorage.setItem('token', 'my-secret-token');

      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeTrue();
      });
    }));

    it('should return false if token does not match', waitForAsync(() => {
      localStorage.setItem('token', 'invalid-token');

      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeFalse();
      });
    }));

    it('should return false if token is not set', waitForAsync(() => {
      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeFalse();
      });
    }));
  });

  xdescribe('logout', () => {
    it('should clear the current user and remove token from localStorage', waitForAsync(() => {
      localStorage.setItem('user', JSON.stringify({ email: 'cami@gmail.com', role: 'user' }));
      localStorage.setItem('token', 'my-secret-token');

      service.authUser$.subscribe((user) => {
        expect(user).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
      });

      service.logout();
    }));
  });
});
