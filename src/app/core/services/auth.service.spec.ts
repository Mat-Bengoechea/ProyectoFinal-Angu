import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../../feature/auth/interfaces/User';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true and set user if credentials are valid', () => {
      const email = 'alfro@gmail.com';
      const password = '07291';

      const result = service.login(email, password);

      expect(result).toBeTrue();
      service.authUser$.subscribe((user) => {
        expect(user).toEqual({
          email: 'alfro@gmail.com',
          role: 'admin',
        } as User);
      });
      expect(localStorage.getItem('token')).toBe('my-secret-token');
    });

    it('should return false if credentials are invalid', () => {
      const email = 'invalid@gmail.com';
      const password = 'wrongpassword';

      const result = service.login(email, password);

      expect(result).toBeFalse();
      service.authUser$.subscribe((user) => {
        expect(user).toBeNull();
      });
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('getRole', () => {
    it('should return the current user as BehaviorSubject', () => {
      const email = 'mateo@gmail.com';
      const password = '1234';

      service.login(email, password);
      const role = service.getRole();

      expect(role.value).toEqual({
        email: 'mateo@gmail.com',
        role: 'admin',
      } as User);
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
    it('should clear the current user and remove token from localStorage', () => {
      const email = 'cami@gmail.com';
      const password = '53434';

      service.login(email, password);
      service.logout();

      service.authUser$.subscribe((user) => {
        expect(user).toBeNull();
      });
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});

