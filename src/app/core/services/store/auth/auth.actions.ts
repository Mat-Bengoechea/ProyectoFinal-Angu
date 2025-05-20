import { createAction, props } from "@ngrx/store";


export interface AuthPayload {
    email: string;
    role: string;
};

export const setAuthUser = createAction(
    "[Auth] SetAuthUser",
    props<{payload: AuthPayload}>()
);

export const unsetAuthUser = createAction('[Auth] UnsetAuthUser');


export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);