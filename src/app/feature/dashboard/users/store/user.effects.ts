import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { userService } from '../../../../core/services/UserService.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userservice: userService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.userservice.getuserListobs().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      concatMap((action) =>
        this.userservice.adduser(action.user).pipe(
          map((user) => UserActions.addUsersSuccess({ user })),
          catchError((error) => of(UserActions.addUsersFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap(({ id }) =>
        this.userservice.deleteUser(id).pipe(
          map(() => UserActions.deleteUsersSuccess({ id: id })),
          catchError((error) => of(UserActions.addUsersFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap(({ user }) =>
        this.userservice.updatedUser(user).pipe(
          map((updateduser) =>
            UserActions.updateUsersSuccess({ user: updateduser })
          ),
          catchError((error) => of(UserActions.addUsersFailure({ error })))
        )
      )
    )
  );

  setUserToEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setUserToEdit),
      concatMap(({ id }) =>
        this.userservice.getUserById(id).pipe(
          map((user) => UserActions.setUserToEditSuccess({ user })),
          catchError((error) => of(UserActions.setUserToEditFailure({ error })))
        )
      )
    )
  );
}
