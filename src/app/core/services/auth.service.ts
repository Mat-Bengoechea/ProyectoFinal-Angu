import { Injectable } from '@angular/core';
import { User } from '../../feature/auth/interfaces/User';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser.asObservable();

  private TOKEN = 'my-secret-token';

  private users = [
    {
      email: 'alfro@gmail.com',
      password: '07291',
      role: 'admin',
    },
    {
      email: 'mateo@gmail.com',
      password: '1234',
      role: 'admin',
    },
    {
      email: 'rosty@gmail.com',
      password: '23323',
      role: 'user',
    },
    {
      email: 'cami@gmail.com',
      password: '53434',
      role: 'user',
    },
  ]

  constructor() {}

  login(email: string, password: string): boolean {
 const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return false;
    }
const { password: _, ...userWithoutPassword } = user;
  this._authUser.next(userWithoutPassword);

    localStorage.setItem('token', this.TOKEN);
    

    return true;
  }

  getRole() {
    return this._authUser;
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return of(token === this.TOKEN);
  }

  logout() {
    this._authUser.next(null);
    localStorage.removeItem('token');
  }
}
