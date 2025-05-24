import { createFeatureSelector, createSelector } from "@ngrx/store";
import { usersFeatureKey, UserState } from "./user.reducer";

export const selectUserState =
createFeatureSelector<UserState>(usersFeatureKey);

export const selectUsers = createSelector(
    selectUserState,
    (state)=>state.users
);

export const selectusersLoading = createSelector(
    selectUserState,
    (state)=> state.isLoading
);

export const selectUserserror = createSelector(
    selectUserState,
    (state)=> state.error
);

export const selectUserById = (id: string) =>  createSelector(
    selectUsers,
    (users) => users.find(user => user.id === id)
);

export const selectUserToEdit = createSelector(
    selectUserState,
    (state)=> state.userToEdit
);