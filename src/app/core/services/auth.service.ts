import { Injectable } from '@angular/core';
import { User } from '../../feature/auth/interfaces/User';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: User | null = null;

  constructor() {}

  login(email: string, password: string): boolean {
    if (email !== 'matg@gmail.com' || password !== '07291') {
      return false;
    }

    this.authUser = {
      email,
      role: 'admin',
    };

    return true;
  }

  logout() {
    this.authUser = null;
  }
}
