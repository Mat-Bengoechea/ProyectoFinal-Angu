import { Injectable } from '@angular/core';
import { User } from '../../feature/auth/interfaces/User';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { RootState } from './store/index';
import { Store } from '@ngrx/store';
import { setAuthUser, unsetAuthUser } from './store/auth/auth.actions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser.asObservable();

  private TOKEN = 'my-secret-token';

  constructor(private store: Store<RootState>, private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this._authUser.next(JSON.parse(user));
    }
  }
  
    login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`/api/users?email=${email}&password=${password}`).pipe(
      map(users => users.length ? users[0] : null)
    );
  }

  setAuthUser(user: User | null) {
  this._authUser.next(user);
}

  register(user: User): Observable<User>{
    return this.http.post<User>('/api/users', user);
  }

  updateUser(id: string, changes: Partial<User>): Observable<User>{
    return this.http.patch<User>(`/api/users/${id}`, changes);
  }

  deleteUser(id: string): Observable<void>{
    return this.http.delete<void>(`/api/users/${id}`);
  }

  getRole() {
    return this._authUser.asObservable();
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return of(token === this.TOKEN);
  }

  logout() {
    this._authUser.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.store.dispatch(unsetAuthUser());
  }
}
