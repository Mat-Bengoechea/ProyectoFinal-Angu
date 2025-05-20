import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../../feature/dashboard/users/interface/interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private userNameSubject = new BehaviorSubject<string>('Jose Luis');
  userName$ = this.userNameSubject.asObservable();

  private userSubject = new BehaviorSubject<Users[]>([]);
  UserList$ = this.userSubject.asObservable();

  userEdit = new BehaviorSubject<Users | null>(null);
  userEdit$ = this.userEdit.asObservable();

  constructor(private http: HttpClient) {}

  private _userlist: Users[] = [];

  get userlist(): Users[] {
    return this._userlist;
  }

  deleteUser(id: string) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar este usuario?'
    );
    if (!confirmDelete) {
      return;
    }
    this.http
      .delete<Users>(`${environment.apiUrl}/users/${id}`)
      .subscribe({
        next: (Users) => {
          this._userlist = this._userlist.filter((users) => users.id !== id);
          this.userSubject.next(this._userlist);
        },
        error: (error) => {
          console.error('Error eliminando usuario:', error);
        },
      });
  }

  setUpdateUser(id: string) {
    const user = this._userlist.find((users) => users.id === id);
    if (!user) {
      alert('No se encontró el usuario');
      return;
    }
    this.userEdit.next(user);
  }

  updatedUser(users: Users): void {
    this.http
      .put<Users>(`${environment.apiUrl}/users/${users.id}`, users)
      .subscribe({
        next: (updatedUser) => {
          this._userlist = this._userlist.map((users) =>
            users.id === updatedUser.id ? updatedUser : users
          );
          this.userSubject.next(this._userlist);
          this.userEdit.next(null);
        },
        error: (error) => {
          console.error('Error actualizando usuario:', error);
        },
      });
  }

  getuserListobs() {
    this.userSubject.next(this._userlist);
    this.http.get<Users[]>(`${environment.apiUrl}/users`).subscribe({
      next: (users) => {
        this._userlist = users;
        this.userSubject.next(this._userlist);
      },
      error: (error) => {
        console.error('Error obteniendo la lista de estudiantes:', error);
      },
    });
  }

  adduserListobs(users: Users): void {
    this.http
      .post<Users>(`${environment.apiUrl}/users`, users)
      .subscribe({
        next: (users) => {
          this._userlist = [...this._userlist, users];
          this.userSubject.next(this._userlist);
        },
        error: (error) => {
          console.error('Error al agregar usuario:', error);
        },
      });
  }
}
