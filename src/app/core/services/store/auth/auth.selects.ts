import { createSelector } from '@ngrx/store';
import { RootState } from '..';

export const selectAuthState = (state: RootState) => state.auth;

export const selectUserFullName = createSelector(
  selectAuthState,
  (authState) => authState.authUser?.fullname ?? 'Invitado'
);