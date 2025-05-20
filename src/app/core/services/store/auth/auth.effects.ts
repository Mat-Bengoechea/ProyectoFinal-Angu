import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../services/auth.service';
import { setAuthUser } from './auth.actions';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { login } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action: any) =>
        this.authService.login(action.email, action.password).pipe(
          map((user) => {
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('token', 'my-secret-token');
              this.router.navigate(['/dashboard']);
              return setAuthUser({
                payload: { email: user.email, role: user.role },
              });
            } else {
              alert('Email o contraseña incorrectos');
              return { type: '[Auth] LoginFailed' };
            }
          })
        )
      )
    )
  );
}
