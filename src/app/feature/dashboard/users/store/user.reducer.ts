import { createFeature, createReducer, on } from '@ngrx/store';
import {Users}from '../interface/interface';
import { UserActions } from './user.actions';

export const usersFeatureKey = 'users';

export interface UserState {
  users: Users[];
  isLoading: boolean;
  error: any;
  userToEdit:Users | null;
}

export const initialState: UserState = ({
  users: [],
  isLoading: false,
  error: null,
  userToEdit: null,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state)=>{
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(UserActions.loadUsersSuccess, (state,{users})=>({
    ...state,
    isLoading: false,
    users,
  })),
  on(UserActions.loadUsersFailure,(state,{error})=>{
    return{
      ...state,
      isLoading: false,
      error: error,
    }
  }),
  on(UserActions.addUser, (state)=>{
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(UserActions.addUsersSuccess,(state,{user})=>{
    return{
      ...state,
      isLoading: false,
      users: [...state.users, user],
    }
  }),
  on(UserActions.addUsersFailure,(state,{error})=>{
    return{
      ...state,
      isLoading: false,
      error: error,
    }
  }),
  on(UserActions.deleteUser,(state)=>{
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(UserActions.deleteUsersSuccess,(state,{id})=>{
    return{
      ...state,
      isLoading: false,
      users: state.users.filter((user)=> user.id !== id),
    }
  }),
  on(UserActions.deleteUsersFailure,(state,{error})=>{
    return{
      ...state,
      isLoading: false,
      error: error,
    }
  }),
 on(UserActions.updateUser, (state)=>({
  ...state,
  isLoading: true,
 })),
 on(UserActions.updateUsersSuccess, (state, {user})=>({
  ...state,
  isLoading: false,
  users: state.users.map((u)=>(u.id===user.id?user:u))
 })),
 on(UserActions.updateUsersFailure,(state, {error})=>({
  ...state,
  isLoading: false,
  error,
 })),
 on(UserActions.setUserToEditSuccess, (state, {user})=>({
  ...state,
  userToEdit: user,
 })),
 on(UserActions.clearUserToEdit, (state)=>({
  ...state,
  userToEdit:null,
 }))
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
  }),
});

export const {
selectUsers,selectIsLoading,selectError
} = usersFeature;
