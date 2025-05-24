import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { Users } from '../../feature/dashboard/users/interface/interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../../feature/auth/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private userNameSubject = new BehaviorSubject<string>('Jose Luis');
  userName$ = this.userNameSubject.asObservable();

  private userSubject = new BehaviorSubject<Users[]>([]);
  UserList$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private _userlist: Users[] = [];

  get userlist(): Users[] {
    return this._userlist;
  }

  deleteUser(id: string): Observable<Users> {
    return this.http
      .delete<Users>(`${environment.apiUrl}/users/${id}`);
  }

  updatedUser(users: Users): Observable<Users> {
   return this.http
      .put<Users>(`${environment.apiUrl}/users/${users.id}`, users);
  }

  getuserListobs() {
    this.userSubject.next(this._userlist);
   return this.http.get<Users[]>(`${environment.apiUrl}/users`).pipe(delay(2500));
  }

  getUserById(id: string): Observable<Users>{
    return this.http.get<Users>(`${environment.apiUrl}/users/${id}`);
  }

  adduser(users: Users): Observable<Users> {
    return this.http
      .post<Users>(`${environment.apiUrl}/users`, users);
  }
}
